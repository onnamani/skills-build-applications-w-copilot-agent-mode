import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function CollectionPage({ title, description, endpoint, columns }) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(endpoint, controller.signal)
      .then((items) => {
        setRecords(items)
        setError('')
      })
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') setError(fetchError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [endpoint, reloadKey])

  function retry() {
    setError('')
    setLoading(true)
    setReloadKey((value) => value + 1)
  }

  return (
    <main className="collection-page">
      <div className="page-heading">
        <div>
          <p className="page-eyebrow">OctoFit Tracker</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <span className="record-count" aria-live="polite">
          {loading ? 'Loading records' : `${records.length} ${records.length === 1 ? 'record' : 'records'}`}
        </span>
      </div>

      {error && (
        <div className="alert alert-danger d-flex flex-wrap align-items-center justify-content-between gap-3" role="alert">
          <span>{error}</span>
          <button className="btn btn-sm btn-outline-danger" onClick={retry} type="button">
            Retry
          </button>
        </div>
      )}

      {loading && <p className="collection-message">Loading {title.toLowerCase()}...</p>}

      {!loading && !error && records.length === 0 && (
        <p className="collection-message">No {title.toLowerCase()} have been added yet.</p>
      )}

      {!loading && !error && records.length > 0 && (
        <div className="collection-table-wrap">
          <table className="table table-hover collection-table">
            <thead>
              <tr>
                {columns.map((column) => <th key={column.heading} scope="col">{column.heading}</th>)}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id || `${endpoint}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.heading}>
                      {column.render ? column.render(record, index) : record[column.key] ?? '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
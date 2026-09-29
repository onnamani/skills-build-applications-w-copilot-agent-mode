import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

function Dashboard() {
  const [databaseStatus, setDatabaseStatus] = useState('checking')

  useEffect(() => {
    let active = true

    fetch('/api/health')
      .then((response) => response.json())
      .then((health) => {
        if (active) setDatabaseStatus(health.database)
      })
      .catch(() => {
        if (active) setDatabaseStatus('unavailable')
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <main className="container py-5">
      <header className="d-flex align-items-center gap-3 mb-5">
        <img className="brand-mark" src="/octofitapp-small.png" alt="" />
        <div>
          <p className="text-uppercase small fw-semibold mb-1">OctoFit Tracker</p>
          <h1 className="h2 mb-0">Your movement, in one place.</h1>
        </div>
      </header>

      <section aria-labelledby="system-status-heading" className="status-panel p-4">
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
          <div>
            <p className="text-uppercase small fw-semibold mb-2">Workspace</p>
            <h2 id="system-status-heading" className="h4 mb-1">
              Service status
            </h2>
            <p className="text-secondary mb-0">
              The tracker is ready for your teams, activities, and workouts.
            </p>
          </div>
          <span className="status-pill">
            <span className={`status-dot status-${databaseStatus}`} aria-hidden="true" />
            Database {databaseStatus}
          </span>
        </div>
      </section>
    </main>
  )
}

function NotFound() {
  return (
    <main className="container py-5">
      <h1 className="h2">Page not found</h1>
      <Link to="/">Return to overview</Link>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App

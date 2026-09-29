import CollectionPage from './CollectionPage.jsx'

const columns = [
  { heading: 'Activity', key: 'type' },
  { heading: 'Member', render: (activity) => `Member ${String(activity.userId || '').slice(-6) || '—'}` },
  { heading: 'Duration', render: (activity) => `${activity.durationMinutes ?? '—'} min` },
  { heading: 'Calories', key: 'calories' },
  {
    heading: 'Date',
    render: (activity) => activity.date ? new Date(activity.date).toLocaleDateString() : '—',
  },
]

export default function Activities() {
  return (
    <CollectionPage
      columns={columns}
      description="Recent movement logged by OctoFit members."
      endpoint="activities"
      title="Activities"
    />
  )
}
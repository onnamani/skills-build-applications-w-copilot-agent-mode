import CollectionPage from './CollectionPage.jsx'

const columns = [
  { heading: 'Rank', render: (_entry, index) => `#${index + 1}` },
  { heading: 'Member', render: (entry) => `Member ${String(entry.userId || '').slice(-6) || '—'}` },
  { heading: 'Points', key: 'points' },
  { heading: 'Period', key: 'period' },
]

export default function Leaderboard() {
  return (
    <CollectionPage
      columns={columns}
      description="Compare points earned across the community."
      endpoint="leaderboard"
      title="Leaderboard"
    />
  )
}
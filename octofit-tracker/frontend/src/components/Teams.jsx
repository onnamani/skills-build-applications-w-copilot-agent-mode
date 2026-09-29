import CollectionPage from './CollectionPage.jsx'

const columns = [
  { heading: 'Team', key: 'name' },
  { heading: 'Description', key: 'description' },
  { heading: 'Members', render: (team) => Array.isArray(team.members) ? team.members.length : 0 },
]

export default function Teams() {
  return (
    <CollectionPage
      columns={columns}
      description="Training groups and their members."
      endpoint="teams"
      title="Teams"
    />
  )
}
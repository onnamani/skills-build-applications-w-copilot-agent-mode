import CollectionPage from './CollectionPage.jsx'

const columns = [
  { heading: 'Member', render: (user) => user.displayName || user.username || '—' },
  { heading: 'Username', key: 'username' },
  { heading: 'Email', key: 'email' },
]

export default function Users() {
  return (
    <CollectionPage
      columns={columns}
      description="Profiles registered with OctoFit Tracker."
      endpoint="users"
      title="Users"
    />
  )
}
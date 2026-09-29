import CollectionPage from './CollectionPage.jsx'
import { buildApiUrl } from '../api.js'

const endpoint = buildApiUrl('users', '-8000.app.github.dev/api/users/')

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
      endpoint={endpoint}
      title="Users"
    />
  )
}
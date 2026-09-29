import CollectionPage from './CollectionPage.jsx'
import { buildApiUrl } from '../api.js'

const endpoint = buildApiUrl('teams', '-8000.app.github.dev/api/teams/')

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
      endpoint={endpoint}
      title="Teams"
    />
  )
}
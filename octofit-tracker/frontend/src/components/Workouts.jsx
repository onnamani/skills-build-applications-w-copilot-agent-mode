import CollectionPage from './CollectionPage.jsx'
import { buildApiUrl } from '../api.js'

const endpoint = buildApiUrl('workouts', '-8000.app.github.dev/api/workouts/')

const columns = [
  { heading: 'Workout', key: 'title' },
  { heading: 'Category', key: 'category' },
  { heading: 'Difficulty', key: 'difficulty' },
  { heading: 'Description', key: 'description' },
]

export default function Workouts() {
  return (
    <CollectionPage
      columns={columns}
      description="Suggested sessions for different training goals."
      endpoint={endpoint}
      title="Workouts"
    />
  )
}
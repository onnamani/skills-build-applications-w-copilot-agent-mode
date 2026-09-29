import CollectionPage from './CollectionPage.jsx'

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
      endpoint="workouts"
      title="Workouts"
    />
  )
}
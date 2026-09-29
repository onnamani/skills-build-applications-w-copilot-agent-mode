import { createBrowserRouter, Link, Navigate } from 'react-router-dom'
import App from './App.jsx'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/activities" replace /> },
      { path: 'activities', element: <Activities /> },
      { path: 'leaderboard', element: <Leaderboard /> },
      { path: 'teams', element: <Teams /> },
      { path: 'users', element: <Users /> },
      { path: 'workouts', element: <Workouts /> },
      {
        path: '*',
        element: (
          <section className="collection-page">
            <p className="page-eyebrow">OctoFit Tracker</p>
            <h1 className="page-title">Page not found</h1>
            <Link to="/activities">Return to activities</Link>
          </section>
        ),
      },
    ],
  },
])
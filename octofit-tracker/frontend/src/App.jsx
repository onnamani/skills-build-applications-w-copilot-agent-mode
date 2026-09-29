import { Link, NavLink, Outlet } from 'react-router-dom'
import { API_TARGET } from './api.js'
import './App.css'

const navigationItems = [
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-brand-row">
            <Link className="app-brand" to="/activities" aria-label="OctoFit Tracker home">
              <img src="/octofitapp-small.png" alt="" />
              <span>OctoFit Tracker</span>
            </Link>
            <span className="api-target">API / {API_TARGET}</span>
          </div>
          <nav className="app-nav" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <NavLink
                className={({ isActive }) => `app-nav-link${isActive ? ' active' : ''}`}
                key={item.path}
                to={item.path}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <div className="app-main">
        <Outlet />
      </div>

      <footer className="app-footer">
        <span>OctoFit Tracker</span>
        <span>Movement, measured together.</span>
      </footer>
    </div>
  )
}

export default App

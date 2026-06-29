import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SiteFooter } from './components/SiteFooter'
import { SiteNav } from './components/SiteNav'
import { Dashboard } from './pages/Dashboard'
import { Landing } from './pages/Landing'
import { PolicyTracker } from './pages/PolicyTracker'
import { ProviderFinder } from './pages/ProviderFinder'

function App() {
  return (
    <HashRouter>
      <div className="app">
        <SiteNav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/find-a-dentist" element={<FinderPage />} />
          <Route path="/policy-tracker" element={<TrackerPage />} />
        </Routes>
        <SiteFooter />
      </div>
    </HashRouter>
  )
}

function DashboardPage() {
  return (
    <div className="page">
      <Dashboard />
    </div>
  )
}

function FinderPage() {
  return (
    <div className="page">
      <ProviderFinder />
    </div>
  )
}

function TrackerPage() {
  return (
    <div className="page">
      <PolicyTracker />
    </div>
  )
}

export default App

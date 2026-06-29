import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SiteFooter } from './components/SiteFooter'
import { SiteNav } from './components/SiteNav'
import { Dashboard } from './pages/Dashboard'
import { Landing } from './pages/Landing'
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

export default App

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import PromoCodes from './pages/PromoCodes'
import Promotions from './pages/Promotions'
import Clients from './pages/Clients'
import Partners from './pages/Partners'
import Employees from './pages/Employees'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/promocodes" element={<PromoCodes />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App



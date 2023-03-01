import { useEffect } from 'react'
import { embedDashboard } from '@superset-ui/embedded-sdk'
import './App.css'

const SUPERSET_DASHBOARD_ID = process.env.REACT_APP_SUPERSET_DASHBOARD_ID
const SUPERSET_DASHBOARD_URL = process.env.REACT_APP_SUPERSET_DASHBOARD_URL
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL

function App() {
  const getGuestToken = async () => {
    const response = await fetch(`${BACKEND_API_URL}/guest-token`)
    const token = await response.json()
    return token
  }

  useEffect(() => {
    const embedSupersetDashboard = async () => {
      await embedDashboard({
        id: SUPERSET_DASHBOARD_ID,
        supersetDomain: SUPERSET_DASHBOARD_URL,
        mountPoint: document.getElementById('dashboard'),
        fetchGuestToken: () => getGuestToken(),
        dashboardUiConfig: {
          hideTitle: true,
          hideChartControls: true,
          hideTab: true,
        },
      })
    }
    if (document.getElementById('dashboard')) {
      embedSupersetDashboard()
    }
  }, [])

  return (
    <div className='App'>
      <h1>Superset Dashboard in React</h1>
      <div id='dashboard' />
    </div>
  )
}

export default App

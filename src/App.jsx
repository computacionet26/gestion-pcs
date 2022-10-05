import CenterLayout from './components/CenterLayout'
import Layout from './components/Layout'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Report from './components/Report'
import { useState } from 'react'

function App() {
  const [session, setSession] = useState(localStorage.getItem('session'))
  const urlParams = window.location.href.split('/')

  return (
    <>
      {session 
           ? (JSON.parse(session).roles.includes('TECNIC') || JSON.parse(session).roles.includes('ADMIN'))
            ? !urlParams.includes('report')
              ? <Layout><Dashboard setSession={setSession}/></Layout>
              : <CenterLayout><Report setSession={setSession}/></CenterLayout>
            : <CenterLayout><Report setSession={setSession}/></CenterLayout>
           : <CenterLayout><Login setSession={setSession}/></CenterLayout>
      }
    </>
  )
}

export default App

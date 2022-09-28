import CenterLayout from './components/CenterLayout'
import Layout from './components/Layout'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { useState } from 'react'

function App() {
  const [session, setSession] = useState(localStorage.getItem('session'))

  return (
    <>
      {session 
           ? <Layout><Dashboard setSession={setSession}/></Layout>
           : <CenterLayout><Login setSession={setSession}/></CenterLayout>
      }
    </>
  )
}

export default App

import { useState } from "react"

function Dashboard({setSession}){
    const session = localStorage.getItem('session')
    const sessionData = JSON.parse(session)

    const [section, setSelection] = useState('reportes')

    function cerrarSesion(){
        localStorage.removeItem('session')
        setSession(null)
    }

    console.log(section);

    return (
        <>
            <header className="w-screen bg-white flex justify-between items-center px-8 py-4 shadow">
                <h1 className="text-2xl font-semibold text-slate-600">{sessionData.username}</h1>
                <button onClick={cerrarSesion} className="text-xl font-semibold bg-red-400 rounded px-4 py-2 text-white">Cerrar sesion</button>
            </header>

            <div className="p-4">
                <div id="sidebar" className="bg-white flex flex-col w-1/4 p-6 gap-1 rounded">
                    

                    
                    </div>

                <main>

                </main>
            </div>
        </>
    )
}

export default Dashboard
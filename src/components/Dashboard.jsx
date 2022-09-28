function Dashboard({setSession}){
    const session = localStorage.getItem('session')
    const sessionData = JSON.parse(session)

    function cerrarSesion(){
        localStorage.removeItem('session')
        setSession(null)
    }

    return (
        <>
            <header className="w-screen bg-white flex justify-between items-center px-8 py-4 shadow">
                <h1 className="text-2xl font-semibold text-slate-600">{sessionData.username}</h1>
                <button onClick={cerrarSesion} className="text-xl font-semibold bg-red-400 rounded px-4 py-2 text-white">Cerrar sesion</button>
            </header>

            <div>
                <div id="sidebar">
                    
                </div>

                <main>

                </main>
            </div>
        </>
    )
}

export default Dashboard
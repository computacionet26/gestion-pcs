import { useState } from "react"
import SelectionButton from "./SelectionButton"
import Usuarios from "./sections/Usuarios"

function Dashboard({setSession}){
    const session = localStorage.getItem('session')
    const sessionData = JSON.parse(session)

    const [section, setSelection] = useState('reportes')

    function cerrarSesion(){
        localStorage.removeItem('session')
        setSession(null)
    }

    function changeSection(){
        if(section == 'reportes'){
            return (
                <h1>Reportes</h1>
            )
        }else if(section == 'usuarios'){
            return <Usuarios></Usuarios>
        }else if(section == 'laboratorios'){
            return <h1>laboratorios</h1>
            
        }else if(section == 'computadoras'){
            return <h1>computadoras</h1>
        }else if(section == 'roles'){
            return <h1>roles</h1>
        }
    }

    return (
        <>
            <header className="w-screen bg-white flex justify-between items-center px-8 py-4 shadow-lg">
                <h1 className="text-2xl font-semibold text-slate-600">{sessionData.username}</h1>
                <button onClick={cerrarSesion} className="text-xl font-semibold bg-red-400 rounded px-4 py-2 text-white">Cerrar sesion</button>
            </header>

            <div className="p-4 pr-6 flex gap-4 items-start">
                <div id="sidebar" className="bg-white sticky top-4 z-10 flex flex-col w-1/4 p-6 gap-1 rounded shadow-lg min-h">
                    <SelectionButton setSelection={setSelection} sectionName='Reportes' section={section}/>
                    <SelectionButton setSelection={setSelection} sectionName='Usuarios' section={section}/>
                    <SelectionButton setSelection={setSelection} sectionName='Laboratorios' section={section}/>
                    <SelectionButton setSelection={setSelection} sectionName='Computadoras' section={section}/>
                    <SelectionButton setSelection={setSelection} sectionName='Roles' section={section}/>
                </div>

                <main className="w-full bg-white rounded shadow-lg p-6">
                    {changeSection()}
                </main>
            </div>
        </>
    )
}

export default Dashboard
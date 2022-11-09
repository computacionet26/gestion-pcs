import {useRef, useState, useEffect} from 'react'
import axios from 'axios'

export default function ({setSession}){

    const id = useRef('')
    const desc = useRef('')
    const [msg, setMsg] = useState(null)
    const [error, setError] = useState(null)

    const sessionData = JSON.parse(localStorage.getItem('session'))
    const urlParams = window.location.href.split('/')

    function cerrarSesion(){
        localStorage.removeItem('session')
        setSession(null)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const hola = await axios({
                method: "POST",
                url:  `http://localhost:3000/device/report/${id.current.value}`,
                data: {
                    "desc": desc.current.value
                },
                headers: {
                    Authorization: sessionData.token                }
            })
            console.log(hola);
            setError(null)
            setMsg(`Tu reporte se realizo con exito!`)
        } catch (error) {
            setMsg(null)
            setError(`El dispositivo con la ID "${id.current.value}" no existe.`)
        }
    }

    useEffect(() => {
        if(urlParams.includes('report') && id.current.value === '' && urlParams[urlParams.length-1] !== 'report') {
            id.current.value = urlParams[urlParams.length-1]
        }
    }, [])

    return (
        <div className=''>
            <header className="w-full bg-white flex justify-between items-center px-8 py-4 shadow-lg border border-b-slate-400 rounded-t">
                <h1 className="text-2xl font-semibold text-slate-600">{sessionData.username}</h1>
                <button onClick={cerrarSesion} className="text-xl font-semibold bg-red-400 rounded px-4 py-2 text-white">Cerrar sesion</button>
            </header>

            <form action="http://localhost:3000/user/login" onSubmit={handleSubmit} method="post" className='flex flex-col gap-6 bg-white p-8 rounded-b shadow-xl'>
               <div className='flex gap-2 flex-col'>
                        <p className='text-xl text-gray-600 font-semibold'>ID del dispositivo</p>
                        <input type="text" ref={id} required placeholder='ID' disabled className='bg-gray-200 border border-b-slate-400 py-2 px-4 focus:border-slate-400 focus:outline-none text-2xl text-slate-600'/>
                      </div>

                <div className='flex gap-2 flex-col'>
                    <p className='text-xl text-gray-600 font-semibold'>Descripcion del reporte</p>
                    <textarea type="text" ref={desc} rows='5' cols='50' name="desc" required placeholder='Descripcion' className='border border-b-slate-400 py-2 px-4 border-slate-400 focus:outline-none text-2xl text-slate-600'></textarea>
                </div>

                <input type="submit" value="Reportar" className='font-semibold bg-slate-500 py-2 px-4 text-white text-2xl cursor-pointer'/>
                {error &&
                     <p className='text-red-400 font-semibold text-xl text-center'>{error}</p>
                }
                {msg &&
                     <p className='text-green-500 font-semibold text-xl text-center'>{msg}</p>
                }
            </form>
        </div>
    )
}
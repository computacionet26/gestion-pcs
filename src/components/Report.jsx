import {useState} from 'react'
import axios from 'axios'

export default function ({setSession}){

    const session = localStorage.getItem('session')
    const sessionData = JSON.parse(session)

    const [id, setId] = useState('')
    const [lab, setLab] = useState('')
    const [desc, setDesc] = useState('')
    const [msg, setMsg] = useState('')
    const urlParams = window.location.href.split('/')

    const fetchPC = async () => {
        const updatedUsers = await axios({
            method: "GET",
            url: `http://localhost:3000/pc/${id}`,
            headers: {
                Authorization: sessionData.token
            }
        })
        setLab(updatedUsers.data.lab);
    }

    if(urlParams.includes('report') && id == '') {
        setId(urlParams[urlParams.length-1])
        fetchPC()
    }

    function cerrarSesion(){
        localStorage.removeItem('session')
        setSession(null)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const res = await axios.post(`http://localhost:3000/pc/report/${id}`, {
                desc
            })
            localStorage.setItem('session', JSON.stringify(res.data))
            setSession(localStorage.getItem('session'))
        } catch (error) {
            setMsg('Esa pc no existe.')
        }
    }

    return (
        <div className='scale-75'>
            <header className="w-full bg-white flex justify-between items-center px-8 py-4 shadow-lg border border-b-slate-400 rounded-t">
                <h1 className="text-2xl font-semibold text-slate-600">{sessionData.username}</h1>
                <button onClick={cerrarSesion} className="text-xl font-semibold bg-red-400 rounded px-4 py-2 text-white">Cerrar sesion</button>
            </header>

            <form action="http://localhost:3000/user/login" onSubmit={handleSubmit} method="post" className='flex flex-col gap-6 bg-white p-8 rounded-b shadow-xl'>
                {id == ''
                    ? <div className='flex gap-2 flex-col'>
                        <p className='text-xl text-gray-600 font-semibold'>PC ID</p>
                        <input type="text" onChange={e => setId(e.target.value)} required placeholder='PC ID' className='border border-b-slate-400 py-2 px-4 focus:border-slate-400 focus:outline-none text-2xl text-slate-600'/>
                      </div>
                : <div className='flex gap-2 flex-col'>
                    <p className='text-xl text-gray-600 font-semibold'>PC ID</p>
                    <input type="text" onChange={e => setId(e.target.value)} disabled value={id} placeholder='PC ID' className='bg-gray-200 py-2 px-4 focus:border-slate-400 focus:outline-none text-2xl text-slate-600'/>
                  </div>
                }

                {id != ''
                    ? <div className='flex gap-2 flex-col'>
                        <p className='text-xl text-gray-600 font-semibold'>Laboratorio </p>
                        <input type="text" onChange={e => setId(e.target.value)} disabled required value={lab} placeholder='Laboratorio' className='bg-gray-200 py-2 px-4 focus:border-slate-400 focus:outline-none text-2xl text-slate-600'/>
                      </div>
                : null}

                <div className='flex gap-2 flex-col'>
                    <p className='text-xl text-gray-600 font-semibold'>Descripcion del reporte</p>
                    <textarea type="text" rows='5' cols='50' onChange={e => setDesc(e.target.value)} name="desc" required placeholder='Descripcion' className='border border-b-slate-400 py-2 px-4 border-slate-400 focus:outline-none text-2xl text-slate-600'></textarea>
                </div>

                <input type="submit" value="Reportar" className='font-semibold bg-slate-500 py-2 px-4 text-white text-2xl cursor-pointer'/>
                {msg !== ''
                    ? <p className='text-red-400 font-semibold text-xl text-center'>{msg}</p>
                    : null
                }
                
            </form>
        </div>
    )
}
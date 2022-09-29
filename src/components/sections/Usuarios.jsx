import axios from "axios"
import { useState, useEffect } from "react"

export default function(){
    const [users, setUsers] = useState([])
    const [newUserModal, setNewUserModal] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')

    const sessionData = JSON.parse(localStorage.getItem('session'))

    const fetchData = async () => {
        const updatedUsers = await axios({
            method: "GET",
            url: "http://localhost:3000/user",
            headers: {
                Authorization: sessionData.token
            }
        })
        console.log(updatedUsers.data[0]);
        setUsers(updatedUsers.data);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await axios({
                method: "POST",
                url: 'http://localhost:3000/user/register',
                data: {
                    username,
                    email,
                    password,
                    roles: "TEACHER"
                },
                headers: {
                    Authorization: sessionData.token
                }
            })
            setNewUserModal(false)
        } catch (error) {
            setMsg('Ese usuario ya existe')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div className="flex flex-col gap-2">

            {newUserModal 
            ? <div className="fixed w-screen h-screen bg-opacity-50 bg-slate-600 top-0 left-0 flex justify-center items-center">
                <form action="http://localhost:3000/user/login" onSubmit={handleSubmit} method="post" className='flex flex-col gap-6 bg-white p-8 rounded shadow-xl'>
                    <div className='flex gap-2 flex-col'>
                        <p className='text-xl text-gray-600 font-semibold'>Nombre</p>
                        <input type="text" onChange={e => setUsername(e.target.value)} name="username" required id="username" placeholder='Nombre' className='border border-b-slate-400 py-2 px-4 focus:border-slate-400 focus:outline-none text-2xl text-slate-600'/>
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <p className='text-xl text-gray-600 font-semibold'>Email</p>
                        <input type="text" onChange={e => setEmail(e.target.value)} name="email" required id="email" placeholder='Email' className='border border-b-slate-400 py-2 px-4 focus:border-slate-400 focus:outline-none text-2xl text-slate-600'/>
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <p className='text-xl text-gray-600 font-semibold'>Contraseña</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} name="password" required id="password" placeholder='Contraseña' className='border border-b-slate-400 py-2 px-4 focus:border-slate-400 focus:outline-none text-2xl text-slate-600'/>
                    </div>
                    <input type="submit" value="Registrar usuario" className='font-semibold bg-slate-500 py-2 px-4 text-white text-2xl cursor-pointer'/>
                    {msg !== ''
                        ? <p className='text-red-400 font-semibold text-xl text-center'>{msg}</p>
                        : null
                    }
                </form>
            </div>
            : null}

            <button onClick={() => setNewUserModal(true)} className="p-4 rounded font-bold outline outline-1 outline-slate-300 text-slate-600">+ Agergar usuario</button>
            
            {users.map(user => 
                <div className="bg-slate-300 p-4 rounded flex justify-between">
                    <div className="flex gap-2 items-center">
                        <h1 className="text-xl text-slate-600 font-semi-bold">{user.username}</h1>
                        <p className="text-slate-400 text-lg">({user.roles})</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="text-slate-600 text-lg">Editar</button>
                        <button className="text-red-400 text-lg">Eliminar</button>
                    </div>
                </div>
            )}
        </div>
    )
}
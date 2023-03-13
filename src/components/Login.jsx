import {useState} from 'react'
import {post} from 'axios'

function Login({setSession}){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const res = await post(`${import.meta.env.VITE_API_URL}/user/login`, {
                username: email,
                password
            })
            localStorage.setItem('session', JSON.stringify(res.data))
            setSession(localStorage.getItem('session'))
        } catch (error) {
            setMsg(`${email.includes('@') ? 'Email' : 'Nombre'} o contraseña incorrectos`)
        }
    }

    return (
        <div className='w-11/12 sm:w-auto'>
            <form action={`${import.meta.env.VITE_API_URL}/user/login`} onSubmit={handleSubmit} method="post" className='flex flex-col gap-6 bg-white p-8 rounded shadow-xl'>
                <div className='flex gap-2 flex-col'>
                    <p className='text-xl text-gray-600 font-semibold'>Nombre o email</p>
                    <input type="text" onChange={e => setEmail(e.target.value)} name="email" required id="email" placeholder='Tu nombre o email' className='border border-b-slate-400 py-2 px-4 focus:border-slate-400 focus:outline-none text-2xl text-slate-600'/>
                </div>
                <div className='flex gap-2 flex-col'>
                    <p className='text-xl text-gray-600 font-semibold'>Contraseña</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} name="password" required id="password" placeholder='Tu contraseña' className='border border-b-slate-400 py-2 px-4 focus:border-slate-400 focus:outline-none text-2xl text-slate-600'/>
                </div>
                <input type="submit" value="Iniciar sesion" className='font-semibold bg-slate-500 py-2 px-4 text-white text-2xl cursor-pointer'/>
                {msg !== ''
                    ? <p className='text-red-400 font-semibold text-xl text-center'>{msg}</p>
                    : null
                }
            </form>
        </div>
    )
}

export default Login
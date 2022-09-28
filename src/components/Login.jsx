import React from 'react'

function Login(){
    return (
        <div>
            <form action="http://localhost:3000/user/login" method="post" className='flex flex-col gap-6 bg-white p-8 rounded shadow'>
                <div className='flex gap-2 flex-col'>
                    <p className='text-xl text-gray-600 font-semibold'>Email</p>
                    <input type="email" name="email" required id="email" placeholder='Tu email' className='border shadow text-2xl py-2 px-4 focus:outline-slate-400 text-slate-600 rounded'/>
                </div>
                <div className='flex gap-2 flex-col'>
                    <p className='text-xl text-gray-600 font-semibold'>Contraseña</p>
                    <input type="password" name="password" required id="password" placeholder='Tu contraseña' className='border shadow py-2 px-4 focus:outline-slate-400 text-2xl text-slate-600 rounded'/>
                </div>
                <input type="button" value="Iniciar sesion" className='border font-semibold bg-slate-500 shadow py-2 px-4 text-white text-2xl cursor-pointer rounded'/>
            </form>
        </div>
    )
}

export default Login
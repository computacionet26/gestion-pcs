import React from 'react'

function Layout({children}){
    return (
        <div className='bg-slate-400 w-screen flex h-screen justify-center items-center'>
            {children}
        </div>
    )
}

export default Layout
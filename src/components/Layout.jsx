function Layout({children}){
    return (
        <div className='bg-slate-400 w-screen flex h-screen flex-col'>
            {children}
        </div>
    )
}

export default Layout
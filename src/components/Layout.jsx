function Layout({children}){
    return (
        <div className='bg-slate-400 w-screen flex flex-col h-screen overflow-hidden scrollbar-thin scrollbar-thumb-gray-600'>
            {children}
        </div>
    )
}

export default Layout
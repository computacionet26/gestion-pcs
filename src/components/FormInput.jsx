export default function({title, type, name, id = name, placeholder = title, onChangeCallback, required = false, value}) {
    return (
        <div className='flex gap-2 flex-col'>
            <p className='text-xl text-gray-600 font-semibold'>{title}</p>
            {required == true
                ? <input type={type} onChange={e => onChangeCallback(e.target.value)} name={name} required id={id} placeholder={placeholder} value={value} className='border border-b-slate-400 py-2 px-4 focus:border-slate-400 focus:outline-none text-2xl text-slate-600'/>
                : <input type={type} onChange={e => onChangeCallback(e.target.value)} name={name} id={id} placeholder={placeholder} value={value} className='border border-b-slate-400 py-2 px-4 focus:border-slate-400 focus:outline-none text-2xl text-slate-600'/>
            }
        </div>
    )
}
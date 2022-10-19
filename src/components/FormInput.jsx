export default function({title, type, name, id = name, placeholder = title, refIndex, required = false, value, children, options}) {
    return (
        <div className='flex gap-2 flex-col'>
            <p className='text-xl text-gray-600 font-semibold'>{title}</p>
            {type === 'select'
                ? <select ref={refIndex} name={name} required={required ? true : false} id={id} placeholder={placeholder} defaultValue={value} className='border border-b-slate-400 py-2 px-4 focus:border-slate-400 focus:outline-none text-2xl text-slate-600'>
                    {children.map(opt => <option value={opt.toLowerCase().replaceAll(' ', '-')}>{opt}</option>)}
                </select>
                : <input type={type} ref={refIndex} name={name} required={required ? true : false} id={id} placeholder={placeholder} defaultValue={value} className='border border-b-slate-400 py-2 px-4 focus:border-slate-400 focus:outline-none text-2xl text-slate-600'/>
            }
        </div>
    )
}
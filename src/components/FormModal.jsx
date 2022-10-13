import FormInput from "./FormInput"

export default function({url, method, submit, inputs, submitCallback, modalCallback, msg, updateTarget, split = 'false'}) {
    
    function handleClick(e){
        if(e.target.id == "FormModalExit") modalCallback(false)
    }

    return (
        <div onClick={e => handleClick(e)} id="FormModalExit" className="fixed w-screen h-screen bg-opacity-50 bg-slate-600 top-0 left-0 flex justify-center items-center">
            <form action={url} method={method} onSubmit={e => submitCallback(e, updateTarget)} className='flex flex-col gap-6 bg-white p-8 rounded shadow-xl'>
                {split == 'false'
                    ? inputs.map((input) =>
                        <FormInput
                            title={input.title}
                            type={input.type}
                            name={input.name}
                            id={input.id}
                            placeholder={input.placeholder}
                            refIndex={input.ref}
                            required={input.required}
                            value={input.value}
                            children={input.children}
                        />
                    )
                    : (() => {
                        const mid = inputs.length/2
                        const first = inputs.slice(0, mid);
                        const second = inputs.slice(mid);
                        return <div className="flex gap-8">
                            <div className="flex flex-col gap-4">
                                {first.map((input) =>
                                        <FormInput
                                            title={input.title}
                                            type={input.type}
                                            name={input.name}
                                            id={input.id}
                                            placeholder={input.placeholder}
                                            ref={input.ref}
                                            required={input.required}
                                            value={input.value}
                                            children={input.children}
                                        />                                
                                )}
                            </div>
                            <div className="flex flex-col gap-4">
                                {second.map((input) =>
                                        <FormInput
                                            title={input.title}
                                            type={input.type}
                                            name={input.name}
                                            id={input.id}
                                            placeholder={input.placeholder}
                                            ref={input.ref}
                                            required={input.required}
                                            value={input.value}
                                            children={input.children}
                                        />                                
                                )}
                            </div> 
                        </div>
                    })()
                }
        
                <input type="submit" value={submit} className='font-semibold bg-slate-500 py-2 px-4 text-white text-2xl cursor-pointer'/>
                
                {msg !== '' ? 
                    <p className='text-red-400 font-semibold text-xl text-center'>{msg}</p>
                : null}
            </form>
        </div>
    )
}
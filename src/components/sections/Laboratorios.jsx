import axios from "axios"
import { useState, useEffect, useRef } from "react"
import FormModal from "../FormModal"

export default function(){
    const [labs, setLabs] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const name = useRef('')
    const updateName = useRef('')
    const [msg, setMsg] = useState('')

    const sessionData = JSON.parse(localStorage.getItem('session'))

    const fetchData = async () => {
        const updatedLabs = await axios({
            method: "GET",
            url: "http://localhost:3000/lab",
            headers: {
                Authorization: sessionData.token
            }
        })
        setLabs(updatedLabs.data);
    }

    async function addLab(event) {
        event.preventDefault();
        try {
            await axios({
                method: "POST",
                url: 'http://localhost:3000/lab',
                data: {
                    name: name.current.value
                },
                headers: {
                    Authorization: sessionData.token
                }
            })
            setAddModal(false)
            fetchData()
        } catch (error) {
            setMsg('Ese laboratorio ya existe')
        }
    }

    async function removeLab(name) {
        try {
            await axios({
                method: "DELETE",
                url: `http://localhost:3000/lab/${name}`,
                headers: {
                    Authorization: sessionData.token
                }
            })
            fetchData()
        } catch (error) {
            setMsg('Ese laboratorio no existe')
        }
    }

    function updateLabModal(name_){
        updateName.current = {value: name_}
        name.current = {value: name_}
        setUpdateModal(true)
    }

    async function updateLab(event) {
        event.preventDefault();
        try {
            await axios({
                method: "PUT",
                url: `http://localhost:3000/lab/${updateName.current.value}`,
                data: {
                    name: name.current.value
                },
                headers: {
                    Authorization: sessionData.token
                }
            })
            setUpdateModal(false)
            fetchData()
        } catch (error) {
            setMsg('Ese laboratorio no existe')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div className="flex flex-col gap-2">

            {addModal ?
                <FormModal 
                    url="http://localhost:3000/lab" 
                    methid="POST"
                    submit="Añadir laboratorio"
                    submitCallback={addLab}
                    modalCallback={setAddModal}
                    msg={msg}
                    inputs={[
                        {
                            title: "Nombre",
                            type: "text",
                            name: "name",
                            ref: name,
                            required: true
                        }
                    ]}
                />
            : null}

            {updateModal ?
                <FormModal 
                    url="http://localhost:3000/lab" 
                    methid="POST"
                    submit="Actualizar laboratorio"
                    submitCallback={updateLab}
                    modalCallback={setUpdateModal}
                    msg={msg}
                    inputs={[
                        {
                            title: "Nombre",
                            type: "text",
                            name: "name",
                            ref: name,
                            required: true,
                            value: name.current.value
                        }
                    ]}
                />
            : null}

            <button onClick={() => setAddModal(true)} className="p-4 rounded font-bold outline outline-1 outline-slate-300 text-slate-600">+ Añadir laboratorio</button>
            
            {labs.map(lab => 
                <div className="bg-slate-300 p-4 rounded flex justify-between">
                    <h1 className="text-xl text-slate-600 font-semi-bold">{lab.name}</h1>
                    {lab.name !== 'ADMIN' ?
                        <div className="flex gap-4">
                            <button onClick={() => updateLabModal(lab.name)} className="text-slate-600 text-lg">Editar</button>
                            <button onClick={() => removeLab(lab.name)} className="text-red-400 text-lg">Eliminar</button>
                        </div>
                    : null}
                </div>
            )}
        </div>
    )
}
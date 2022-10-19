import axios from "axios"
import { useState, useEffect, useRef } from "react"
import FormModal from "../FormModal"

export default function(){
    const [roles, setRoles] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const name = useRef('')
    const updateName = useRef('')
    const [msg, setMsg] = useState('')

    const sessionData = JSON.parse(localStorage.getItem('session'))

    const fetchData = async () => {
        const updatedUsers = await axios({
            method: "GET",
            url: "http://localhost:3000/role",
            headers: {
                Authorization: sessionData.token
            }
        })
        setRoles(updatedUsers.data);
    }

    async function addRole(event) {
        event.preventDefault();
        try {
            await axios({
                method: "POST",
                url: 'http://localhost:3000/role',
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
            setMsg('Ese rol ya existe')
        }
    }

    async function updateRole(event) {
        event.preventDefault();
        try {
            await axios({
                method: "PUT",
                url: `http://localhost:3000/role/${updateName.current.value}`,
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
            setMsg('Ese rol no existe')
        }
    }

    function updateRoleModal(name_){
        updateName.current = {value: name_}
        name.current = {value: name_}
        setUpdateModal(true)
    }

    async function removeRole(name) {
        try {
            await axios({
                method: "DELETE",
                url: `http://localhost:3000/role/${name}`,
                headers: {
                    Authorization: sessionData.token
                }
            })
            setAddModal(false)
            fetchData()
        } catch (error) {
            setMsg('Ese rol no existe')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div className="flex flex-col gap-2">

            {addModal ?
                <FormModal 
                    url="http://localhost:3000/rol" 
                    methid="POST"
                    submit="Añadir rol"
                    submitCallback={addRole}
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
                    url="http://localhost:3000/role" 
                    methid="POST"
                    submit="Actualizar rol"
                    submitCallback={updateRole}
                    modalCallback={setUpdateModal}
                    msg={msg}
                    updateTarget={updateName}
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

            <button onClick={() => setAddModal(true)} className="p-4 rounded font-bold outline outline-1 outline-slate-300 text-slate-600">+ Añadir rol</button>
            
            {roles.map(role => 
                <div className="bg-slate-300 p-4 rounded flex justify-between">
                    <h1 className="text-xl text-slate-600 font-semi-bold">{role.name}</h1>
                    {role.name !== 'ADMIN' ?
                        <div className="flex gap-4">
                            <button onClick={() => updateRoleModal(role.name)} className="text-slate-600 text-lg">Editar</button>
                            <button onClick={() => removeRole(role.name)} className="text-red-400 text-lg">Eliminar</button>
                        </div>
                        : null
                    }
                </div>
            )}
        </div>
    )
}
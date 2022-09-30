import axios from "axios"
import { useState, useEffect } from "react"
import FormModal from "../FormModal"

export default function(){
    const [roles, setRoles] = useState([])
    const [modal, setModal] = useState(false)
    const [name, setName] = useState('')
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
                    name
                },
                headers: {
                    Authorization: sessionData.token
                }
            })
            setModal(false)
            fetchData()
        } catch (error) {
            setMsg('Ese rol ya existe')
        }
    }

    async function removeRole(event, name) {
        event.preventDefault();
        try {
            await axios({
                method: "DELETE",
                url: `http://localhost:3000/role/${name}`,
                headers: {
                    Authorization: sessionData.token
                }
            })
            setModal(false)
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

            {modal ?
                <FormModal 
                    url="http://localhost:3000/rol" 
                    methid="POST"
                    submit="Añadir rol"
                    submitCallback={addRole}
                    modalCallback={setModal}
                    msg={msg}
                    inputs={[
                        {
                            title: "Nombre",
                            type: "text",
                            name: "name",
                            onChangeCallback: setName,
                            required: true
                        }
                    ]}
                />
            : null} 

            <button onClick={() => setModal(true)} className="p-4 rounded font-bold outline outline-1 outline-slate-300 text-slate-600">+ Agergar rol</button>
            
            {roles.map(role => 
                <div className="bg-slate-300 p-4 rounded flex justify-between">
                    <h1 className="text-xl text-slate-600 font-semi-bold">{role.name}</h1>
                    {role.name !== 'ADMIN' ?
                        <div className="flex gap-4">
                            <button className="text-slate-600 text-lg">Editar</button>
                            <button onClick={() => removeRole(event, role.name)} className="text-red-400 text-lg">Eliminar</button>
                        </div>
                        : null
                    }
                </div>
            )}
        </div>
    )
}
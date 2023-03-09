import axios from "axios"
import { useState, useEffect, useRef } from "react"
import FormModal from "../FormModal"

export default function(){
    const [users, setUsers] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const username = useRef('')
    const updateUsername = useRef('')
    const email = useRef('')
    const password = useRef('')
    const roles = useRef('')
    const [msg, setMsg] = useState('')

    const sessionData = JSON.parse(localStorage.getItem('session'))

    const fetchData = async () => {
        const updatedUsers = await axios({
            method: "GET",
            url: "http://10.120.3.179:3000/user",
            headers: {
                Authorization: sessionData.token
            }
        })
        setUsers(updatedUsers.data);
    }

    async function addUser(event) {
        event.preventDefault();
        try {
            await axios({
                method: "POST",
                url: 'http://10.120.3.179:3000/user/register',
                data: {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value,
                    roles: roles.current.value
                },
                headers: {
                    Authorization: sessionData.token
                }
            })
            setAddModal(false)
            fetchData()
        } catch (error) {
            setMsg('Ese usuario ya existe')
        }
    }

    async function removeUser(username) {
        try {
            await axios({
                method: "DELETE",
                url: `http://10.120.3.179:3000/user/${username}`,
                headers: {
                    Authorization: sessionData.token
                }
            })
            setAddModal(false)
            fetchData()
        } catch (error) {
            setMsg('Ese laboratorio no existe')
        }
    }

    async function updateUser(event) {
        event.preventDefault();
        try {
            await axios({
                method: "PUT",
                url: `http://10.120.3.179:3000/user/${updateUsername.current.value}`,
                data: {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value,
                    roles: roles.current.value,
                },
                headers: {
                    Authorization: sessionData.token
                }
            })
            setUpdateModal(false)
            fetchData()
        } catch (error) {
            setMsg('Ese usuario no existe')
        }
    }

    function updateUserModal(username_, email_, password_, roles_){
        updateUsername.current = {value: username_}
        username.current = {value: username_}
        email.current = {value: email_}
        roles.current = {value: roles_}
        password.current = {value: ''}
        console.log(roles.current.value);
        setUpdateModal(true)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div className="flex flex-col gap-2">

            {addModal ?
               <FormModal
                    url="http://10.120.3.179:3000/user/register" 
                    methid="POST"
                    submit="Registrar usuario"
                    submitCallback={addUser}
                    modalCallback={setAddModal}
                    msg={msg}
                    inputs={[
                        {
                            title: "Nombre",
                            type: "text",
                            name: "username",
                            ref: username,
                            required: true
                        },
                        {
                            title: "Email",
                            type: "text",
                            name: "email",
                            ref: email,
                            required: true
                        },
                        {
                            title: "Contraseña",
                            type: "text",
                            name: "password",
                            ref: password,
                            required: true
                        },
                        {
                            title: "Rol",
                            type: "select",
                            name: "roles",
                            ref: roles,
                            children: ['TEACHER','TECNIC','ADMIN']
                        }
                    ]}
                />
            : null}

            {updateModal ?
               <FormModal
                    url="http://10.120.3.179:3000/user" 
                    methid="PUT"
                    submit="Actualizar usuario"
                    submitCallback={updateUser}
                    modalCallback={setUpdateModal}
                    msg={msg}
                    inputs={[
                        {
                            title: "Nombre",
                            type: "text",
                            name: "username",
                            ref: username,
                            required: true,
                            value: username.current.value
                        },
                        {
                            title: "Email",
                            type: "text",
                            name: "email",
                            ref: email,
                            required: true,
                            value: email.current.value
                        },
                        {
                            title: "Contraseña",
                            type: "text",
                            name: "password",
                            ref: password,
                            required: true,
                            value: password.current.value
                        },
                        {
                            title: "Rol",
                            type: "select",
                            name: "roles",
                            ref: roles,
                            children: [...new Set([(roles.current.value).toString(),'ADMIN', 'TEACHER','TECNIC'])]
                        }
                    ]}
                />
            : null}

            <button onClick={() => setAddModal(true)} className="p-4 rounded font-bold outline outline-1 outline-slate-300 text-slate-600">+ Registrar usuario</button>
            
            {users.map(user => 
                <div className="bg-slate-300 p-4 rounded flex justify-between">
                    <div className="flex gap-2 items-center">
                        <h1 className="text-xl text-slate-600 font-semi-bold">{user.username}</h1>
                        <p className="text-slate-400 text-lg">({user.roles})</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => updateUserModal(user.username, user.email, user.password, user.roles)} className="text-slate-600 text-lg">Editar</button>
                        <button onClick={() => removeUser(user.username)} className="text-red-400 text-lg">Eliminar</button>
                    </div>
                </div>
            )}
        </div>
    )
}
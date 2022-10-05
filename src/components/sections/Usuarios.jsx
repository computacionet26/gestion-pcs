import axios from "axios"
import { useState, useEffect } from "react"
import FormModal from "../FormModal"

export default function(){
    const [users, setUsers] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [username, setUsername] = useState('')
    const [updateUsername, setUpdateUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')

    const sessionData = JSON.parse(localStorage.getItem('session'))

    const fetchData = async () => {
        const updatedUsers = await axios({
            method: "GET",
            url: "http://localhost:3000/user",
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
                url: 'http://localhost:3000/user/register',
                data: {
                    username,
                    email,
                    password,
                    roles: "TEACHER"
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

    async function removeUser(event, username) {
        event.preventDefault();
        try {
            await axios({
                method: "DELETE",
                url: `http://localhost:3000/user/${username}`,
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

    async function updateUser(event, updateUsername) {
        event.preventDefault();
        console.log({
            username,
            email,
            password,
            roles: "TEACHER",
            updateUsername
        });
        try {
            await axios({
                method: "PUT",
                url: `http://localhost:3000/user/${updateUsername}`,
                data: {
                    username,
                    email,
                    password,
                    roles: "TEACHER"
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

    function updateUserModal(name, email, password){
        setUpdateUsername(name)
        setUsername(name)
        setEmail(email)
        setPassword('')
        setUpdateModal(true)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div className="flex flex-col gap-2">

            {addModal ?
               <FormModal
                    url="http://localhost:3000/user/register" 
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
                            onChangeCallback: setUsername,
                            required: true
                        },
                        {
                            title: "Email",
                            type: "text",
                            name: "email",
                            onChangeCallback: setEmail,
                            required: true
                        },
                        {
                            title: "Contraseña",
                            type: "text",
                            name: "password",
                            onChangeCallback: setPassword,
                            required: true
                        }
                    ]}
                />
            : null}

            {updateModal ?
               <FormModal
                    url="http://localhost:3000/user" 
                    methid="PUT"
                    submit="Actualizar usuario"
                    submitCallback={updateUser}
                    modalCallback={setUpdateModal}
                    msg={msg}
                    updateTarget={updateUsername}
                    inputs={[
                        {
                            title: "Nombre",
                            type: "text",
                            name: "username",
                            onChangeCallback: setUsername,
                            required: true,
                            value: username
                        },
                        {
                            title: "Email",
                            type: "text",
                            name: "email",
                            onChangeCallback: setEmail,
                            required: true,
                            value: email
                        },
                        {
                            title: "Contraseña",
                            type: "text",
                            name: "password",
                            onChangeCallback: setPassword,
                            required: true,
                            value: password
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
                        <button onClick={() => updateUserModal(user.username, user.email, user.password)} className="text-slate-600 text-lg">Editar</button>
                        <button onClick={e => removeUser(e, user.username)} className="text-red-400 text-lg">Eliminar</button>
                    </div>
                </div>
            )}
        </div>
    )
}
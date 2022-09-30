import axios from "axios"
import { useState, useEffect } from "react"
import FormModal from "../FormModal"

export default function(){
    const [users, setUsers] = useState([])
    const [modal, setModal] = useState(false)
    const [username, setUsername] = useState('')
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
            setModal(false)
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
            setModal(false)
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

            {modal ?
               <FormModal
                    url="http://localhost:3000/user/register" 
                    methid="POST"
                    submit="Registrar usuario"
                    submitCallback={addUser}
                    modalCallback={setModal}
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

            <button onClick={() => setModal(true)} className="p-4 rounded font-bold outline outline-1 outline-slate-300 text-slate-600">+ Registrar usuario</button>
            
            {users.map(user => 
                <div className="bg-slate-300 p-4 rounded flex justify-between">
                    <div className="flex gap-2 items-center">
                        <h1 className="text-xl text-slate-600 font-semi-bold">{user.username}</h1>
                        <p className="text-slate-400 text-lg">({user.roles})</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="text-slate-600 text-lg">Editar</button>
                        <button onClick={e => removeUser(e, user.username)} className="text-red-400 text-lg">Eliminar</button>
                    </div>
                </div>
            )}
        </div>
    )
}
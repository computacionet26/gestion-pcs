import axios from "axios"
import QRCode from "qrcode"
import { useState, useEffect, useRef } from "react"
import FormModal from "../FormModal"
import QRCanvas from "../QRCanvas"

export default function(){
    const [devices, setDevices] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [QRModal, setQRModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [msg, setMsg] = useState('')
    const type = useRef('')
    const os = useRef('')
    const ram = useRef('')
    const cpu = useRef('')
    const gpu = useRef('')
    const disc = useRef('')
    const power = useRef('')
    const lab = useRef('')
    const labs = useRef([])
    const labsNames = useRef([])

    const QRDeviceProps = useRef(null)

    const sessionData = JSON.parse(localStorage.getItem('session'))

    const fetchData = async () => {
        const devicesData = await axios({
            method: "GET",
            url: "http://localhost:3000/device",
            headers: {
                Authorization: sessionData.token
            }
        })
        const labsData = await axios({
            method: "GET",
            url: "http://localhost:3000/lab",
            headers: {
                Authorization: sessionData.token
            }
        })
        labs.current = {value: labsData.data}
        labsNames.current = {value: labsData.data.map(lab => lab.name)}
        setDevices(devicesData.data)
    }

    async function addDevice(event) {
        event.preventDefault();

        const formData = new FormData(event.target)
        const formProps = Object.fromEntries(formData)

        formProps.labId = labs.current.value.find(lab => lab.name == formProps.lab).id

        Object.entries(formProps).forEach(([key, value]) => {
            if(value === '') delete formProps[key]
        })

        console.log(formProps);
        console.log(formProps);

        try {
            await axios({
                method: "POST",
                url: 'http://localhost:3000/device',
                data: formProps,
                headers: {
                    Authorization: sessionData.token
                }
            })
            setAddModal(false)
            fetchData()
        } catch (error) {
            setMsg('Hubo un error')
        }
    }

    async function removeDevice(id) {
        try {
            await axios({
                method: "DELETE",
                url: `http://localhost:3000/device/${id}`,
                headers: {
                    Authorization: sessionData.token
                }
            })
            setAddModal(false)
            fetchData()
        } catch (error) {
            setMsg('Ese dispositivo no existe')
        }
    }

    async function openQRModal(device){
        QRDeviceProps.current = device
        QRDeviceProps.current.img = await QRCode.toDataURL(`http://127.0.0.1:5173/report/${device.id}`)
        setQRModal(true)
    }

    // async function genQR(id){
    //     const qr = 
    //     let a = document.createElement('a');
    //     a.href = qr;
    //     a.download = `${id}.png`;
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    //     console.log(qr);
    //     return qr
    // }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div className="flex flex-col gap-2">

            {QRModal &&
                <div onClick={() => setQRModal(false)} className="fixed w-screen h-screen bg-opacity-50 bg-slate-600 top-0 left-0 flex justify-center items-center">
                    <QRCanvas device={QRDeviceProps.current}></QRCanvas>
                </div>
            }

            {addModal ?
               <FormModal
                    className='scale-5'
                    url="http://localhost:3000/device" 
                    methid="POST"
                    submit="Agregar dispositivo"
                    submitCallback={addDevice}
                    modalCallback={setAddModal}
                    msg={msg}
                    split='true'
                    inputs={[
                        {
                            title: "Dispositivo",
                            type: "select",
                            name: "type",
                            ref: type,
                            children: ['PC','Impresora3D', 'Impresora','Proyector']
                        },
                        {
                            title: "RAM",
                            type: "text",
                            name: "ram",
                            ref: ram, 
                        },
                        {
                            title: "Sistema operativo",
                            type: "text",
                            ref: os,
                            name: "os",
                        },
                        {
                            title: "Almacenamiento",
                            type: "text",
                            name: "disc",
                            ref: disc,
                        },
                        {
                            title: "Procesador",
                            type: "text",
                            name: "cpu",
                            ref: cpu,
                        },
                        {
                            title: "Tarjeta de video",
                            type: "text",
                            name: "gpu",
                            ref: gpu,
                        }
                        ,
                        {
                            title: "Fuente de poder",
                            type: "text",
                            name: "power",
                            ref: power,
                        },
                        {
                            title: "Laboratorio",
                            type: "select",
                            name: "lab",
                            ref: lab,
                            children: labsNames.current.value
                        },
                    ]}
                />
            : null}

            {/* {updateModal ?
               <FormModal
                    url="http://localhost:3000/user" 
                    methid="PUT"
                    submit="Actualizar dispositivo"
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
            : null} */}

            <button onClick={() => setAddModal(true)} className="p-4 rounded font-bold outline outline-1 outline-slate-300 text-slate-600">+ Añadir dispositivo</button>
            
            {devices.map(device => 
                <div className="bg-slate-300 p-4 rounded flex justify-between">
                    <div className="flex gap-2 items-center">
                        <h1 className="text-xl text-slate-600 font-semi-bold">{device.type}</h1>
                        <p className="text-slate-400 text-lg">({device.lab})</p>
                        <p className="text-slate-400 text-lg">({device.id})</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => openQRModal(device)} className="text-green-600 text-lg">QR</button>
                        {/* <button onClick={() => updateUserModal(user.username, user.email, user.password)} className="text-slate-600 text-lg">Editar</button> */}
                        <button onClick={() => removeDevice(device.id)} className="text-red-400 text-lg">Eliminar</button>
                    </div>
                </div>
            )}
        </div>
    )
}
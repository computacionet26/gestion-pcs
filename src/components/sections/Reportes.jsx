import axios from "axios"
import moment from "moment/moment"
import FormModal from "../FormModal"
import { useState, useEffect, useRef } from "react"

export default function(){
    const [asignarModal, setAsignarModal] = useState(false)
    const [reports, setReports] = useState([])
    const [tab, setTab] = useState(false)
    const [users, setUsers] = useState([])
    const [reportIdAsignar, setReportIdAsignar] = useState(null)

    const sessionData = JSON.parse(localStorage.getItem('session'))

    const fetchData = async (filtrado = false) => {
        const reportsData = await axios({
            method: "GET",
            url: `${import.meta.env.VITE_API_URL}/device/reports`,
            headers: {
                Authorization: sessionData.token
            }
        })
        const data = reportsData.data.filter(report => report.resolved === filtrado).sort((a, b) => moment(a.createdAt).diff(b.createdAt)).reverse()
        setReports(data);
    }

    function changeTab(newTab){
        setTab(newTab)
        fetchData(newTab)
    }

    async function resolveReport(id) {
        try {
            await axios({
                method: "PUT",
                url: `${import.meta.env.VITE_API_URL}/device/report/${id}`,
                data: {
                    resolved: true,
                    resolvedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                },
                headers: {
                    Authorization: sessionData.token
                }
            })
            fetchData(tab)
        } catch (error) {}
    }

    async function asignar(reportId) {
        const updatedUsers = await axios({
            method: "GET",
            url: `${import.meta.env.VITE_API_URL}/user`,
            headers: {
                Authorization: sessionData.token
            }
        })
        setUsers(updatedUsers.data.filter(user => user.roles.includes('TECNIC')).map(user => user.username))
        setReportIdAsignar(reportId)
        setAsignarModal(true)
    }

    async function asignarSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formProps = Object.fromEntries(formData)
        try {
            const res = await axios({
                method: "PUT",
                url: `${import.meta.env.VITE_API_URL}/device/report/${reportIdAsignar}`,
                data: {
                    ...formProps,
                    asignadoAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                },
                headers: {
                    Authorization: sessionData.token
                }
            })
            console.log(res);
            fetchData(tab)
        } catch (error) {
            console.log(error);
        }
        setAsignarModal(false)
    }


    async function removeReport(id) {
        try {
            await axios({
                method: "DELETE",
                url: `${import.meta.env.VITE_API_URL}/device/report/${id}`,
                headers: {
                    Authorization: sessionData.token
                }
            })
            fetchData(tab)
        } catch (error) {}
    }

    useEffect(() => {
        fetchData(tab)
    }, [])

    return(
        <div className="w-full">

            {asignarModal &&
                <FormModal
                url={`${import.meta.env.VITE_API_URL}/device/report`}
                methid="PUT"
                submit="Asignar tecnico"
                submitCallback={asignarSubmit}
                modalCallback={setAsignarModal}
                inputs={[
                    {
                        title: "TECNICO",
                        type: "select",
                        name: "asignado",
                        children: users
                    }
                ]}
            />
            }

            <div className="flex">
                <button onClick={() => changeTab(false)} className={tab == false ? "text-slate-600 text-xl border-t-2 border-t-red-400 p-2 bg-white" : "text-slate-600 text-xl border-t-2 border-t-red-400 p-2 bg-gray-400"}>No resueltos</button>
                <button onClick={() => changeTab(true)} className={tab == true ? "text-slate-600 text-xl border-t-2 border-t-green-400 p-2 bg-white" : "text-slate-600 text-xl border-t-2 border-t-green-400 p-2 bg-gray-400"}>Resueltos</button>
            </div>

            <div className="flex flex-col gap-2 w-full bg-white rounded-b shadow-lg p-6">

            {reports.map(report => 
                <div>
                    {(sessionData.roles.includes('ADMIN') || (sessionData.roles.includes('TECNIC') && sessionData.username == report.asignado)) &&
                        <div 
                            className= {report.resolved == false 
                                ? "bg-slate-400 p-4 rounded flex justify-between border-[2.5px] border-red-300"
                                : "bg-slate-400 p-4 rounded flex justify-between border-[2.5px] border-green-400"
                            }
                        >
                        
                        <div className="flex flex-col md:flex-row w-full gap-2 md:justify-between">
                            <div className="flex gap-2 flex-col md:flex-row w-full">
                                <div className="flex p-2 rounded bg-white flex-col gap-1">
                                        {report.asignado ? 
                                            <>
                                                <h1 className="text-xl text-slate-600 flex flex-row gap-2 underline bg-slate-300 p-2 rounded-sm w-full">Asignado: <p className="font-semibold">{report.asignado}</p></h1>
                                                <h1 className="text-xl text-slate-600 flex flex-row gap-2 bg-slate-300 p-2 rounded-sm">Fecha asignado: <p className="font-semibold">{moment(report.asignadoAt).format('MM/DD/YYYY, h:mm a')}</p></h1>
                                            </>
                                            :
                                            <h1 className="text-xl text-red-400 font-bold flex flex-row gap-2 bg-slate-300 p-2 rounded-sm">SIN ASIGNAR</h1>    
                                        }
                                        <h1 className="text-xl text-slate-600 flex flex-row gap-2 bg-slate-300 p-2 rounded-sm">Usuario: <p className="font-semibold">{report.user}</p></h1>
                                        <h1 className="text-xl text-slate-600 flex flex-row gap-2 bg-slate-300 p-2 rounded-sm">Laboratorio: <p className="font-semibold">{report.lab}</p></h1>
                                        <h1 className="text-xl text-slate-600 flex flex-row gap-2 bg-slate-300 p-2 rounded-sm w-full">Dispositivo: <p className="font-semibold">{report.deviceType}</p></h1>
                                        <h1 className="text-xl text-slate-600 flex flex-row gap-2 bg-slate-300 p-2 rounded-sm">ID: <p className="font-semibold">{report.deviceId}</p></h1>
                                        <h1 className="text-xl text-slate-600 flex flex-row gap-2 bg-slate-300 p-2 rounded-sm">Fecha: <p className="font-semibold">{moment(report.createdAt).format('MM/DD/YYYY, h:mm a')}</p></h1>
                                        {report.resolved && <h1 className="text-xl text-slate-600 flex flex-row gap-2 bg-slate-300 p-2 rounded-sm">Fecha resuelto: <p className="font-semibold">{moment(report.resolvedAt).format('MM/DD/YYYY, h:mm a')}</p></h1> }
                                </div>
                                <div className="flex gap-2 p-2 rounded bg-white flex-col w-full">
                                    <h1 className="text-xl text-slate-600 flex flex-row gap-2 font-semibold bg-slate-300 p-2 rounded-sm">Descripcion:</h1>
                                    <p className="text-slate-600 h-full text-xl bg-slate-300 p-2">{report.desc}</p>
                                </div>
                            </div>

                            <div className="flex justify-center sm:justify-between flex-wrap md:flex-col gap-2">
                                {report.resolved == false &&
                                <>
                                    <button onClick={() => resolveReport(report.id)} className="text-white text-xl bg-green-400 rounded px-6 py-2 font-semibold">Resolver</button>
                                    {sessionData.roles.includes('ADMIN') && <button onClick={() => asignar(report.id)} className="text-white text-xl bg-slate-500 rounded px-6 py-2 font-semibold">Asignar</button>}
                                </> 
                                }
                                    {sessionData.roles.includes('ADMIN') && <button onClick={() => removeReport(report.id)} className="text-white text-xl bg-red-400 rounded px-6 py-2 font-semibold">Eliminar</button>}
                                </div>
                            </div>
                        </div>
                    }
            </div>
            )}
        </div>
        </div>
    )
}
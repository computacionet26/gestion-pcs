import axios from "axios"
import { useState, useEffect, useRef } from "react"

export default function(){
    const [reports, setReports] = useState([])

    const sessionData = JSON.parse(localStorage.getItem('session'))

    const fetchData = async () => {
        const reportsData = await axios({
            method: "GET",
            url: "http://localhost:3000/device/reports",
            headers: {
                Authorization: sessionData.token
            }
        })
        setReports(reportsData.data);
    }

    async function resolveReport(id) {
        try {
            await axios({
                method: "PUT",
                url: `http://localhost:3000/device/report/${id}`,
                headers: {
                    Authorization: sessionData.token
                }
            })
            fetchData()
        } catch (error) {}
    }

    async function removeReport(id) {
        try {
            await axios({
                method: "DELETE",
                url: `http://localhost:3000/device/report/${id}`,
                headers: {
                    Authorization: sessionData.token
                }
            })
            fetchData()
        } catch (error) {}
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div className="flex flex-col gap-2">

            {reports.map(report => 
                <div 
                    className= {report.resolved == false 
                        ? "bg-slate-300 p-4 rounded flex justify-between border-[2.5px] border-red-400"
                        : "bg-slate-300 p-4 rounded flex justify-between border-[2.5px] border-green-400"
                    }
                >
                    <div className="flex gap-2">
                        <div className="flex py-2 px-6 rounded bg-white flex-col">
                            <div>
                                <h1 className="text-xl text-slate-600 flex flex-row gap-2">Usuario: <p className="font-semibold">{report.user}</p></h1>
                                <h1 className="text-xl text-slate-600 flex flex-row gap-2">Laboratorio: <p className="font-semibold">{report.lab}</p></h1>
                            </div>
                            <div>
                                <h1 className="text-xl text-slate-600 flex flex-row gap-2">Dispositivo: <p className="font-semibold">{report.deviceType}</p></h1>
                                <h1 className="text-xl text-slate-600 flex flex-row gap-2">ID: <p className="font-semibold">{report.deviceId}</p></h1>
                            </div>
                        </div>
                        <div className="flex gap-2 p-2 rounded bg-white">
                            <p className="text-slate-600 text-xl">{report.desc}</p>
                        </div>
                    </div>
                    <div className="flex justify-between flex-col">
                        {report.resolved == false ? <button onClick={() => resolveReport(report.id)} className="text-white text-xl bg-green-400 rounded px-6 py-2 font-semibold">Resolved</button> : <div></div>}
                        <button onClick={() => removeReport(report.id)} className="text-white text-xl bg-red-400 rounded px-6 py-2 font-semibold">Eliminar</button>
                    </div>
                </div>
            )}

        </div>
    )
}
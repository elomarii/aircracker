import { useEffect, useState } from 'react';
import SelectionMenu from '../components/SelectionMenu';
import SimpleButton from '../components/SimpleButton';
import { GetInterfaces, GetServices } from '../../wailsjs/go/aircracker/App'
import { aircracker } from '../../wailsjs/go/models'

function InterfacePanel() {
    const [interfaces, setInterfaces] = useState<aircracker.Interface[]>([])
    const [services, setServices] = useState<aircracker.NetSvc[]>([])
    const [iface, setIface] = useState<aircracker.Interface>()

    async function getIfaces() {
        const res = await GetInterfaces();
        console.log(res)
        if (res) setInterfaces(res)
    }

    async function getNetsvc() {
        const res = await GetServices()
        console.log(res)
        if (res) setServices(res)
    }

    const selectIface = (value: string) => {
        interfaces.forEach((e)=>{
            if (e.Name === value) setIface(e)
        }) 
    }

    useEffect(() => {
        getIfaces()
        getNetsvc()
    }, [])

    return (
        <div id="interface-panel" className="border rounded-xl p-4">

            <div id="interface" >
                <h2>Wireless interface</h2>
                <p>Select the wireless interface to use</p>
                <SelectionMenu items={interfaces.map((obj)=>obj.Name)} onSelect={selectIface} selection={iface? iface.Name: "▼ N/A"} />
                <pre id="if-details" className="text-xs p-2 border-radius-5 opacity-50">
                    {iface?.Info}
                </pre>
            </div>

            <div id="net-svc" className="mt-5">
                <h2>Network service control</h2>
                <p>Manage network services required for wireless operations</p>
                <SimpleButton text="restart all services ↺" />
                <div className="m-4 lg:grid lg:grid-cols-2 gap-3">
                {services.map((svc)=>
                    <>
                    <div className="grid grid-cols-6 p-3 my-1 border rounded-md">
                        <div className="col-span-3">{svc.Name}</div>
                        <div>{svc.Loaded? "loaded": "not loaded"}</div>
                        <div>{svc.Active? "active": "inactive"}</div>
                        <div>{svc.Status}</div>
                        <p className="opacity-50 text-sm col-span-6">{svc.Desc}</p>
                    </div>
                    </>
                )}
                </div>
            </div>
        </div>
    )
}

export default InterfacePanel

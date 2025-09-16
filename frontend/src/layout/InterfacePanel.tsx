import SelectionMenu from '../components/SelectionMenu';
import SimpleButton from '../components/SimpleButton';

function InterfacePanel() {
    const interfaces = ["wlan0", "mon0"]
    const networkSvc = "iwd"

    return (
        <div id="interface-panel" className="border p-3 grid grid-cols-2">
            <div id="interface" >
                <div>Interface: <span><SelectionMenu items={interfaces} onSelect={()=>null} /></span></div>
                <div>Mode: <span><SelectionMenu items={['managed', 'monitor']} dfSelection="managed" onSelect={()=>null} /></span></div>
            </div>
            <div id="net-svc" className="">
                <p>Network daemon: {networkSvc}</p>
                <SimpleButton text="restart network service ↺" />
            </div>
        </div>
    )
}

export default InterfacePanel

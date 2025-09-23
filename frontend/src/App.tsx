import InterfacePanel from "./layout/InterfacePanel"

function Layout() {
    return (
        <div id="layout" className="h-dvh justify-self-center mx-4 sm:mx-8 md:mx-15">
            <div id="header">
                <h1 className="font-stylish text-[46px] px-5 py-4">AirCracker</h1>
            </div>
            <InterfacePanel />
            <div className="h-full grid grid-cols-5">
                <div id="tools" className="">tools panel</div>
                <div id="tool-output" className="col-span-4">tools panel</div>
            </div>
        </div>
    )
}

function App() {
    return (
        <div id="App">
            <Layout />
        </div>
    )
}

export default App

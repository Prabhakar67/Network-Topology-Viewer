import { useState } from "react";
import TopologyCanvas from "../../topology/TopologyCanvas";
import DeviceList from "../DeviceList";
import { useDevices } from "../../../hooks/useDevices";
import ButtonComponent from "../../ui/Button/Button";

const HomePage = () => {
    const [view, setView] = useState<"home" | "canvas" | "devices">("home");

    const { devices } = useDevices();

    return (
        <div className="h-screen w-full">

            {/* HOME DASHBOARD */}
            {view === "home" && (
                <div className="flex h-full flex-col items-center justify-center gap-6 bg-gray-100">

                    <h1 className="text-3xl font-bold">
                        Network Topology Manager
                    </h1>

                    <div className="flex gap-4">

                        <ButtonComponent
                            title="Open Network Canvas"
                            onClick={() => setView("canvas")}
                            className="bg-blue-600 hover:bg-blue-700 px-3 py-3"
                        />

                        <ButtonComponent
                            title="View Device List"
                            onClick={() => setView("devices")}
                            className="bg-green-600 hover:bg-green-700 px-3 py-3"
                        />

                    </div>
                </div>
            )}

            {/* CANVAS VIEW */}
            {view === "canvas" && (
                <div className="h-full w-full">

                    <div className="absolute left-4 top-4 z-50">
                        <ButtonComponent
                            title="← Back"
                            onClick={() => setView("home")}
                            className="bg-gray-800 hover:bg-gray-900 px-2 py-2 text-sm"
                        />
                    </div>

                    <TopologyCanvas />
                </div>
            )}

            {/* DEVICE LIST VIEW */}
            {view === "devices" && (
                <div className="h-full w-full">

                    <div className="absolute left-4 top-4 z-50">
                        <ButtonComponent
                            title="← Back"
                            onClick={() => setView("home")}
                            className="bg-gray-800 hover:bg-gray-900 px-2 py-2 text-sm"
                        />
                    </div>

                    <DeviceList devices={devices} />

                </div>
            )}
        </div>
    );
};

export default HomePage;
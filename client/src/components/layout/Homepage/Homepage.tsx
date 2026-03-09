import { useState } from "react";
import TopologyCanvas from "../../topology/TopologyCanvas";
import Sidebar from "../Sidebar";
import { useDevices } from "../../../hooks/useDevices";

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

                        <button
                            onClick={() => setView("canvas")}
                            className="rounded-lg bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700"
                        >
                            Open Network Canvas
                        </button>

                        <button
                            onClick={() => setView("devices")}
                            className="rounded-lg bg-green-600 px-6 py-3 text-white shadow hover:bg-green-700"
                        >
                            View Device List
                        </button>

                    </div>
                </div>
            )}

            {/* CANVAS VIEW */}
            {view === "canvas" && (
                <div className="h-full w-full">

                    <div className="absolute left-4 top-4 z-50">
                        <button
                            onClick={() => setView("home")}
                            className="rounded-md bg-gray-800 px-4 py-2 text-white"
                        >
                            ← Back
                        </button>
                    </div>

                    <TopologyCanvas />
                </div>
            )}

            {/* DEVICE LIST VIEW */}
            {view === "devices" && (
                <div className="h-full w-full">

                    <div className="absolute left-4 top-4 z-50">
                        <button
                            onClick={() => setView("home")}
                            className="rounded-md bg-gray-800 px-4 py-2 text-white"
                        >
                            ← Back
                        </button>
                    </div>

                    <Sidebar devices={devices} />

                </div>
            )}
        </div>
    );
};

export default HomePage;
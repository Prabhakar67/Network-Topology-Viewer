import { Router, Server, Network, Shield } from "lucide-react";

const devicesToDrag = [
    { type: "router", label: "Router", icon: Router },
    { type: "switch", label: "Switch", icon: Network },
    { type: "server", label: "Server", icon: Server },
    { type: "firewall", label: "Firewall", icon: Shield },
];

interface Props {
    devices: any[];
    connections: any[];
}

const DeviceSidebar = ({ devices, connections }: Props) => {

    const totalNodes = devices.length;
    const totalConnections = connections.length;
    const onlineDevices = devices.filter(d => d.status === "online").length;
    const offlineDevices = devices.filter(d => d.status === "offline").length;
    const maintenanceDevices = devices.filter(d => d.status === "maintenance").length;

    const subnets = new Set(
        devices
            .map(d => d.ip_address?.split(".").slice(0, 3).join("."))
            .filter(Boolean)
    );

    const totalSubnets = subnets.size;

    const onDragStart = (event: any, deviceType: string) => {
        event.dataTransfer.setData("application/reactflow", deviceType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <div className="w-56 border-r bg-gray-50 p-3 h-full">

            <h4 className="font-semibold text-sm mb-2">Drag devices to canvas</h4>

            {devicesToDrag.map((device) => {
                const Icon = device.icon;

                return (
                    <div
                        key={device.type}
                        draggable
                        onDragStart={(event) => onDragStart(event, device.type)}
                        className="flex items-center gap-2 p-2 border rounded mb-2 bg-white cursor-grab hover:bg-gray-100"
                    >
                        <Icon size={18} className="text-gray-600" />
                        <span className="text-sm">{device.label}</span>
                    </div>
                );
            })}



            <div className="mt-6 border-t pt-4">

                <h4 className="font-semibold text-sm mb-2">
                    Topology Overview
                </h4>

                <div className="text-sm space-y-1">

                    <div>Nodes: {totalNodes}</div>
                    <div>Connections: {totalConnections}</div>
                    <div>Subnets: {totalSubnets}</div>

                </div>


                <div className="mt-6 border-t pt-4">

                    <div className="text-green-600">
                        🟢 Online: {onlineDevices}
                    </div>

                    <div className="text-red-600">
                        🔴 Offline: {offlineDevices}
                    </div>

                    <div className="text-yellow-500">
                        🟡 Maintenance: {maintenanceDevices}
                    </div>

                </div>


                {/* <div className="mt-6 border-t pt-4"> */}
                <div className="flex flex-col pt-4 h-full">

                    <h4 className="font-semibold text-sm mb-2">
                        Devices
                    </h4>

                    <div className="space-y-2 max-h-60 overflow-y-auto">

                        {devices.map((device) => (

                            <div
                                key={device.id}
                                className="flex items-center justify-between text-sm px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                            >

                                <span>{device.name}</span>

                                <span>
                                    {device.status === "online" && "🟢"}
                                    {device.status === "offline" && "🔴"}
                                    {device.status === "warning" && "🟡"}
                                </span>

                            </div>
                        ))}
                    </div>
                </div>


            </div>



        </div>

    );
};

export default DeviceSidebar;
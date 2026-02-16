export interface Device {
    id: number;
    name: string;
    type: string;
    ip_address: string;
    status: "online" | "offline" | "warning" | "maintenance";
    position_x: number;
    position_y: number;
    created_at: string;
    updated_at: string;
}

export interface Connection {
    id: number;
    source_device_id: number;
    target_device_id: number;
    connection_type: string;
    bandwidth: string;
    label: string;
    status: string;
    created_at: string;
}

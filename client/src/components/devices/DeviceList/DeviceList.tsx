import { useDevices } from "../../../hooks/useDevices";

const DeviceList = () => {
    const { devices, loading } = useDevices();

    if (loading) return <div>Loading...</div>;

    return (
        <ul>
            {devices.map((device) => (
                <li key={device.id}>
                    {device.name} - {device.status}
                </li>
            ))}
        </ul>
    );
};

export default DeviceList;

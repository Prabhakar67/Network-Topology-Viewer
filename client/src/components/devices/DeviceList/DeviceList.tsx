import { useDevices } from "../../../hooks/useDevices";

const DeviceList = () => {
    const { filteredDevices, loading } = useDevices();

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <ul>
                <h2>Devices with Status</h2>
                {filteredDevices.map((device) => (
                    <li key={device.id}>
                        {device.name} - {device.status}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default DeviceList;

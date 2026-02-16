import DeviceList from "../../devices/DeviceList";

const Sidebar = () => {
    return (
        <div style={{ width: 300, padding: 20, borderRight: "1px solid #ccc" }}>
            <h2>Devices</h2>
            <DeviceList />
        </div>
    );
};

export default Sidebar;

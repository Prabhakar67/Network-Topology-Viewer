// import DeviceList from "../../devices/DeviceList";

// const Sidebar = () => {
//     return (
//         <div>
//             <h2>Devices</h2>
//             <DeviceList  />
//         </div>
//     );
// };

// export default Sidebar;


import DeviceList from "../../devices/DeviceList";
import type { Device } from "../../../types";

interface Props {
    filteredDevices: Device[];
}

const Sidebar = ({ filteredDevices }: Props) => {
    return (
        <div>
            <h2>Devices</h2>
            <DeviceList filteredDevices={filteredDevices} />
        </div>
    );
};

export default Sidebar;


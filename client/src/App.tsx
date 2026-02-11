import { useEffect, useState } from "react";
import axios from "axios";

interface Device {
  id: number;
  name: string;
  type: string;
  status: string;
  ip_address: string;
}

function App() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/devices")
      .then((res) => setDevices(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Network Topology Viewer</h1>

      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            {device.name} - {device.type} - {device.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

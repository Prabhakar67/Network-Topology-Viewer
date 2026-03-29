
import { Toaster } from "react-hot-toast";
import TopologyCanvas from "./components/topology/TopologyCanvas";

function App() {
  return (<>
    <Toaster
      position="top-right"
      toastOptions={{ duration: 3000, }} />
    <TopologyCanvas />
  </>
  );
}

export default App;

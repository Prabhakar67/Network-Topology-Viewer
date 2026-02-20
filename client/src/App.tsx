
import { Toaster } from "react-hot-toast";
import Header from "./components/layout/Header/Header";
import TopologyCanvas from "./components/topology/TopologyCanvas";

function App() {
  return (<>

    <Toaster
      position="top-right"
      toastOptions={{ duration: 3000, }} />
    <Header />
    {/* <div> */}
    <TopologyCanvas />
    {/* </div> */}
  </>
  );
}

export default App;


import Sidebar from "./components/layout/Sidebar";
import ThemeToggle from "./components/layout/ThemeToggle/ThemeToggle";
import TopologyCanvas from "./components/topology/TopologyCanvas";

function App() {
  return (<>
    <ThemeToggle />
    {/* <Sidebar /> */}
    <div>
      <TopologyCanvas />
    </div>
  </>
  );
}

export default App;

// div- style={{ display: "flex", height: "100vh" }}
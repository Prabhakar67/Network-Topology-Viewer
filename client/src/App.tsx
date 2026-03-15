
import { Toaster } from "react-hot-toast";
import Header from "./components/layout/Header/Header";
import HomePage from "./components/layout/Homepage/Homepage";

function App() {
  return (<>
    <Toaster
      position="top-right"
      toastOptions={{ duration: 3000, }} />
    <Header />
    <HomePage />
  </>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import { ToastProvider } from "./components/ui";

const App = () => {
  return (
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  )
}

export default App
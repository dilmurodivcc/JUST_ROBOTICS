import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import "./scss/main.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App

import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TimerProvider } from "./components/shared/TimerContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TimerProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TimerProvider>
);

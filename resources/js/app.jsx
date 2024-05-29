import './bootstrap';
import "../css/app.css";

import ReactDOM from "react-dom/client";
import Router from "./router";

if (document.getElementById('root')) {
    ReactDOM.createRoot(document.getElementById("root")).render(<Router />);
}

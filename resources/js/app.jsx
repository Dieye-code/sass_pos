import './bootstrap';
import "../css/app.css";

import ReactDOM from "react-dom/client";
import Router from "./router";
import AuthProvider from './components/Auth/AuthProvider';

if (document.getElementById('root')) {
    ReactDOM.createRoot(document.getElementById("root")).render(
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
}

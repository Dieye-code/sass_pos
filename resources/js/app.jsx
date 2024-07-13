import './bootstrap';
import "../css/app.css";

import ReactDOM from "react-dom/client";
import Router from "./router";
import AuthProvider from './components/Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import globalRouter from './components/Auth/GlobalRouter';

if (document.getElementById('root')) {

    ReactDOM.createRoot(document.getElementById("root")).render(
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
}

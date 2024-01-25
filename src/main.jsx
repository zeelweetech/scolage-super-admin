import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/Auth.jsx";
import axios from "axios";

const getCookies = (name) => {
   const cookies = document.cookie.split(';');
   for(let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
         return cookie.substring(name.length + 1)
      }
   }
   return null
}

const authCookie = getCookies('jwtToken')

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.headers.post['Authorization'] = authCookie


ReactDOM.createRoot(document.getElementById("root")).render(
   // <React.StrictMode>
   <AuthProvider>
      <App />
   </AuthProvider>
   // </React.StrictMode>,
);

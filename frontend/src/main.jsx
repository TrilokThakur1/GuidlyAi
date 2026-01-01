import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import UserData from "./context/UserData.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserData>
      <App />
      <ToastContainer />
    </UserData>
  </BrowserRouter>
);

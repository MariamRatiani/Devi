import React from 'react';
import ReactDOM from 'react-dom/client';
import './auth/auth.css'
import Authentication from "./auth/Authentication.tsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Playground from "./playground/Playground.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Authentication />
    },
    {
        path: "/game",
        element: <Playground />
    }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>  
        <RouterProvider router={router} />
    </React.StrictMode>,
)

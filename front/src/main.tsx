import React from 'react';
import ReactDOM from 'react-dom/client';
import './auth/auth.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Playground from "./playground/Playground.tsx";
import Homepage from "./homePage/Homepage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />
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

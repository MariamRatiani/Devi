import React from 'react';
import ReactDOM from 'react-dom/client';
// import Playground from "./playground/Playground.tsx";
import Homepage from "./homePage/Homepage.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/*<Playground />*/}
        <Homepage/>
    </React.StrictMode>,
)

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
import ContextProvider from './components/context/ContextProvider';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
<ContextProvider>
<BrowserRouter>
<App />
</BrowserRouter>
</ContextProvider>

);




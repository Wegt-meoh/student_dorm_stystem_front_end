import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css';
import Login from './pages/Login';
import Index from './pages/Index';



function App() {
    return (
        <div className="App" >
            <BrowserRouter>
                <Routes>
                    <Route index element={<Index />} />
                    <Route path='/app/login' element={<Login />} />
                    <Route path='*' element={<h1>Error:404<br />There is no page here</h1>} />
                </Routes>
            </BrowserRouter>
        </div >
    );
}

export default App;
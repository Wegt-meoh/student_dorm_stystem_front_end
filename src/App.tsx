import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Login from './pages/Login';
import Main from './pages/Main';
import Student from './components/Student';
import Hygiene from './components/Hygiene';
import Service from './components/Service';
import Index from './components/Welcome';


function App() {
    return (
        <div className="App" >
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Main />}>
                        <Route path='index' element={<Index />} />
                        <Route path='student' element={<Student />} />
                        <Route path='clean' element={<Hygiene />} />
                        <Route path='maintain' element={<Service />} />
                    </Route>
                    <Route path='/app/login' element={<Login />} />
                    <Route path='*' element={<h1>Error:404<br />There is no page here</h1>} />
                </Routes>
            </BrowserRouter>
        </div >
    );
}

export default App;
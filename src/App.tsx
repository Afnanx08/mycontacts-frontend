// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminHome from './pages/AdminHome';
import UsersList from './components/admin/UsersList';
import ContactEditor from './components/admin/ContactEditor';
import AppLayout from './pages/AppLayout';
import './App.css';

 


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<div>Select a page from above to navigate.</div>} />
                    <Route path="admin" element={<AdminLogin />} />
                    <Route path="adminRegister" element={<AdminRegister />} />
                </Route>
                <Route path="/adminHome/*" element={<AdminHome />}>
                    <Route index element={<div>Admin Home Dashboard</div>} />
                    <Route path="usersList" element={<UsersList />} />
                    <Route path="contactEditor" element={<ContactEditor />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
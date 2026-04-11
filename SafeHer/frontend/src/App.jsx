import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReportAbuse from './pages/ReportAbuse';
import Analyzer from './pages/Analyzer';
import EvidenceVault from './pages/EvidenceVault';
import Premium from './pages/Premium';
import Account from './pages/Account';
import CyberLaw from './pages/CyberLaw';
import Forum from './pages/Forum';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <div>Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-white text-[#615e5f] font-sans selection:bg-black selection:text-white">
                <Navbar />
                <main className="flex-grow flex flex-col relative bg-white">
                    <div className="relative z-10 flex-grow flex flex-col">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/premium" element={<Premium />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                            <Route path="/report" element={<ProtectedRoute><ReportAbuse /></ProtectedRoute>} />
                            <Route path="/analyzer" element={<ProtectedRoute><Analyzer /></ProtectedRoute>} />
                            <Route path="/vault" element={<ProtectedRoute><EvidenceVault /></ProtectedRoute>} />
                            <Route path="/laws" element={<CyberLaw />} />
                            <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
                            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                        </Routes>
                    </div>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;

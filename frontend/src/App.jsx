import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

 
 const App = () => {
   return (
    <AuthProvider>
      <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute> }
            />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      <Footer />
    </AuthProvider>
   )
 }
 
 export default App;
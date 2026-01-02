import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard';
import AddSnippet from './pages/AddSnippet';
import EditSnippet from './pages/EditSnippet';
import Footer from './components/Footer'
import ResetPassword from './pages/ResetPassword';
import SubmitNewPassword from './pages/SubmitPassword';

 const App = () => {
   return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute> }/>
            <Route path="/snippets/new" element={ <ProtectedRoute><AddSnippet/></ProtectedRoute>} />
            <Route path="/snippets/:id/edit" element={ <ProtectedRoute><EditSnippet/></ProtectedRoute>} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password/submit" element={<SubmitNewPassword />}/>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        <Footer />
      </div>
    </AuthProvider>
   )
 }
 
 export default App;
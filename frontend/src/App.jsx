import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import AddSnippet from './pages/AddSnippet';
import EditSnippet from './pages/EditSnippet';

 const App = () => {
   return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute> }
              />
            <Route path="/snippets/new" element={ <ProtectedRoute><AddSnippet/></ProtectedRoute>} />
            <Route path="/snippets/:id/edit" element={ <ProtectedRoute><EditSnippet/></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        <Footer />
      </div>
    </AuthProvider>
   )
 }
 
 export default App;
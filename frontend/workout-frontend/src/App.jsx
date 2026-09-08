import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import WorkoutsPage from './pages/Workouts';
import WorkoutEdit from './pages/WorkoutEdit';
import Home from './pages/Home';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/dashboard" element={<ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>} />
          <Route path="/workouts" element={<ProtectedRoute>
            <WorkoutsPage/>
          </ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/workouts/:id/edit' element={<WorkoutEdit/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

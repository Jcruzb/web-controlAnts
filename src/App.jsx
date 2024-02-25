import { Route, Routes } from 'react-router'
import './App.css'
import Login from './Views/Login/Login'
import NotFound from './Views/NotFound/NotFound'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Home from './Views/Home/Home';
import { useAuthContext } from './Contexts/AuthContext';

function App() {
  const { isAuthenticationFetched } = useAuthContext();

  if (!isAuthenticationFetched) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      {/* not found */}
      <Route path="*" element={<NotFound/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<ProtectedRoute/>}>
        <Route path="/" element={<Home/>} />
      </Route>

    </Routes>
  )
}

export default App

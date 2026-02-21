import {Navigate, Route, Routes} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LoginRegister from './pages/LoginRegister'
import Recipes from './pages/Recipes'
import SwipeSession from './pages/SwipeSession'
import Profile from './pages/Profile'
import {useAuth} from './context/AuthContext'
import {Box} from '@mui/joy'

function App() {
    const {isLoggedIn} = useAuth();

  return (
      <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.body'}}>
          <Navbar/>
          <Box component="main" sx={{flexGrow: 1}}>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/login" element={isLoggedIn ? <Navigate to="/"/> : <LoginRegister/>}/>
                  <Route path="/recipes" element={<Recipes/>}/>
                  <Route path="/swipe" element={<SwipeSession/>}/>
                  <Route path="/profile" element={isLoggedIn ? <Profile/> : <Navigate to="/login"/>}/>
                  <Route path="*" element={<Navigate to="/"/>}/>
              </Routes>
          </Box>
      </Box>
  )
}

export default App

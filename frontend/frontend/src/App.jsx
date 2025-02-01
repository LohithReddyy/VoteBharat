import React from 'react'
import Navbar from './components/Navbar/navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import LoginPopup from './components/LoginPopup/LoginPopup'

const App = () => {
  const [showLogin,setShowLogin] = React.useState(false)
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : null}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          
        </Routes>
      </div>
    </>
  )
}

export default App

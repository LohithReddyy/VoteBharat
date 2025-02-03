import React from 'react'
import Navbar from './components/Navbar/navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import LoginPopup from './components/LoginPopup/LoginPopup'
import AboutUs from './pages/AboutUs/AboutUs'

const App = () => {
  const [showLogin,setShowLogin] = React.useState(false)
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : null}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
          
        </Routes>
      </div>
    </>
  )
}

export default App

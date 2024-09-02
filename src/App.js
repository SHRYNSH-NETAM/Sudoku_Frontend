import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Game from './components/Game'
import BottomBanner from './components/BottomBanner'
import Landing from './components/Landing'
import User from './components/UserProfile'
import Controller from './components/Controller'
import Login from './components/Auth/login'
import Signup from './components/Auth/signup'

const App = () => {
  
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize',  () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`); 
  })
  
  return (
    <>
        <BrowserRouter>
          {/* <Navbar /> */}
          
            <Controller />
            <Routes>
              <Route path="/" element={<Landing />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/game" element={<Game />}></Route>
              <Route path="/myprofile" element={<User />} />
              {/* <Route path="/stat" element={<Stat />} /> */}
              {/* <Route path="/user/:username" element={<User />}></Route> */}
            </Routes>

            <BottomBanner />
        </BrowserRouter>
    </>
  );
}

export default App;

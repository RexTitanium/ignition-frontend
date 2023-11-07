import React, { useContext, useState } from 'react'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ThemeContext from '../context/ThemeContext';
import './styles/navbar.css'
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

function Navbar({loggedInUser}) {
    const {theme,setTheme} = useContext(ThemeContext)
    const [showLinks,setShowLinks] = useState(false)
    const user = {
        "fname": 'Samyak',
        "lname": 'Shah',
        "email": 's4samyak@gmail.com',
        "pass": 'samyak'
    }
    const navigate = useNavigate()

  return (
    <div className='navbar-container'>
      <div className="navbar-buttons">
        <div className='theme-btn-wrapper'>
              <button className={`theme-btn theme-btn-${theme}`} onClick = {() => setTheme(theme === 'light'? 'dark':'light')}>{theme === 'light' ? 
              <DarkModeOutlinedIcon style={{color: '#ff1b1b', scale: '80%'}}/> : <LightModeOutlinedIcon style={{color: "#ff1b1b", scale: '80%'}}/>
              }</button>
          </div>
          {loggedInUser?
            <div className='user-profile'>
            <div className={`profile-dropdown-${theme}`} onClick={() => setShowLinks(!showLinks)}>
              <Avatar alt={user.fname} src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"/>
              <KeyboardArrowDownRoundedIcon />
            </div>
            {showLinks?
            <div className={`profile-dropdown-list dropdown-list-${theme}`}>
              <a href='/login'>Logout</a>
              <a href='/profile'>Profile</a>
              <a href='/dashboard'>Dashboard</a>
            </div>:<></>}
          </div>
          :<></>}
      </div>
    </div>
  )
}

export default Navbar
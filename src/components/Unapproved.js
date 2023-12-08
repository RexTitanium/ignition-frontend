import React from 'react'
import { useNavigate } from 'react-router-dom'

const Unapproved = ({setLoggedInUser}) => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('jsonwebtoken')
        localStorage.removeItem('theme')
        navigate('/login')
        setLoggedInUser()
    }

  return (
    <div className='unapproved-div'>
        <div>Your account is not yet approved. Wait for approval and log back in!</div>
        <button className='btn-black' onClick={logout}>Logout</button>
    </div>
  )
}

export default Unapproved
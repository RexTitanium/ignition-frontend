import React,{useState, useContext, Component} from 'react'
import LoginPage from '../pages/LoginPage'
import {Routes, Route, Navigate, useParams } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from './PrivateRoute'
import { useSelector } from 'react-redux'
import ThemeContext from '../context/ThemeContext'
import LandingPage from '../pages/LandingPage'
import IndCard from './IndCard'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Navbar from './Navbar'

function Main() {
const {theme, setTheme} =useContext(ThemeContext)

document.body.style.backgroundColor = theme === 'light' ? "#fff" : "#000";
document.body.style.transition = "all 300ms ease";
const users = useSelector(state => state.users)


// const loggedInUser= useSelector(state => state.loggedInUser)
const loggedInUser = {
  "fname": 'Samyak',
  "lname": 'Shah',
  "email": 's4samyak@gmail.com',
  "pass": 'samyak'
}

const graduateDegreeData = [
  { subjectID: 'CSCI B-505', subjectName: 'Advanced Computer Science', semester: 'Fall 2023', percentage: 92.5, professorName: 'Dr. Smith', letterGrade: 'A-minus' },
  { subjectID: 'CSCI B-551', subjectName: 'Artificial Intelligence', semester: 'Fall 2023', percentage: 89.7, professorName: 'Dr. Williams', letterGrade: 'B-plus' },
  { subjectID: 'CSCI P-506', subjectName: 'Advanced Statistics', semester: 'Fall 2023', percentage: 55.7, professorName: 'Dr. Evans', letterGrade: 'F' },
];

const CardId = () => {
  let params = useParams()
  console.log(params)
  return (
    <IndCard
      card={
        graduateDegreeData &&
        graduateDegreeData.filter(
          (subject) => subject.subjectID === params.cardId
        )[0]
      }
    />
  );
};

return (
    <div className='main-container'>
      <div className='main-wrapper'>
        <Navbar loggedInUser={loggedInUser}/>
      </div>
      <Routes>
        <Route path = '/' element={<LandingPage />}/>
        <Route path ='/login' element={<LoginPage users={users} />} /> 
        <Route exact path="/dashboard" element={<Dashboard user={loggedInUser} graduateDegreeData={graduateDegreeData}/>}/>
        <Route
              path="/dashboard/:cardId" 
              element={<CardId />}/>
        <Route element={<PrivateRoute user={loggedInUser}/>}>
            <Route exact path="/dashboard" element={<Dashboard user={loggedInUser}/>} />
        </Route>
        <Route path='*' element={loggedInUser?<></>:<Navigate replace to ="/login"/>}/>
      </Routes>
    </div>
  )
}

export default Main
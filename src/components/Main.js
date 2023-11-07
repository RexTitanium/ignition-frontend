import React,{useState, useContext, Component, useEffect} from 'react'
import LoginPage from '../pages/LoginPage'
import {Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from './PrivateRoute'
import { useSelector } from 'react-redux'
import ThemeContext from '../context/ThemeContext'
import LandingPage from '../pages/LandingPage'
import IndCard from './IndCard'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Navbar from './Navbar'
import axios from 'axios'

function Main() {
const {theme, setTheme} =useContext(ThemeContext)

document.body.style.backgroundColor = theme === 'light' ? "#fff" : "#000";
document.body.style.transition = "all 300ms ease";
const users = useSelector(state => state.users)

const [courseDate, setCourseData] = useState([]);

// const loggedInUser= useSelector(state => state.loggedInUser)
const loggedInUser = useSelector(state => state.loggedInUser)

useEffect(() => {
  courseData()
}, [])

const courseData = async () =>
{
  const data = [];
  const endpoint = 'http://localhost:8080/courses/courseInfo/' + loggedInUser.email;
  const response = await axios.get(endpoint);
  for(const i of (response.data.arr))
  {
    const classCode = i.classCode;
    const className = i.className;
    const percentage = i.percentage;
    const professorName = i.fname + ' ' + i.lname;
    let letterGrade = 'F';
    if(percentage >= 97)
      letterGrade = 'A+'
    else if(percentage > 93)
      letterGrade = 'A';
    else if(percentage > 90)
      letterGrade = 'A-';
    else if(percentage > 87)
      letterGrade = 'B+';
    else if(percentage > 83)
      letterGrade = 'B';
    else if(percentage > 80)
      letterGrade = 'B-';
    else if(percentage > 77)
      letterGrade = 'C+';
    else if(percentage > 73)
      letterGrade = 'C';
    else if(percentage > 70)
      letterGrade = 'C-';
    else if(percentage > 67)
      letterGrade = 'D+';
    else if(percentage > 65)
      letterGrade = 'D';

    data.push({subjectID: classCode, subjectName: className, semester: 'Fall 2023', percentage: percentage, professorName: professorName, letterGrade: letterGrade});
  }

  setCourseData(courseData, data)
}

// const graduateDegreeData = [
//   { subjectID: 'CSCI B-505', subjectName: 'Advanced Computer Science', semester: 'Fall 2023', percentage: 92.5, professorName: 'Dr. Smith', letterGrade: 'A-minus' },
//   { subjectID: 'CSCI B-551', subjectName: 'Artificial Intelligence', semester: 'Fall 2023', percentage: 89.7, professorName: 'Dr. Williams', letterGrade: 'B-plus' },
//   { subjectID: 'CSCI P-506', subjectName: 'Advanced Statistics', semester: 'Fall 2023', percentage: 55.7, professorName: 'Dr. Evans', letterGrade: 'F' },
// ];

const CardId = () => {
  let params = useParams()
  console.log(params)
  return (
    <IndCard
      card={
        courseDate &&
        courseDate.filter(
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
        <Route element={<PrivateRoute user={loggedInUser}/>}>
          <Route exact path="/dashboard" element={<Dashboard user={loggedInUser} graduateDegreeData={courseDate}/>}/>
          <Route
                path="/dashboard/:cardId" 
                element={<CardId />}/>
        </Route>
        <Route path='*' element={loggedInUser?<Navigate replace to ="/dashboard"/>:<Navigate replace to ="/login"/>}/>
      </Routes>
    </div>
  )
}

export default Main
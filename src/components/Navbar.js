import React, { useContext, useState, useEffect } from 'react'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ThemeContext from '../context/ThemeContext';
import './styles/navbar.css'
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Modal } from 'react-bootstrap';
import BASE_URL from '../shared/baseURL';
import axios from 'axios';
import Loading from './Loading';
import Success from './Success';
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.toUpperCase().split(' ')[0][0]}${name.toUpperCase().split(' ')[1][0]}`,
  };
}

function Navbar({loggedInUser,setLoggedInUser}) {
    const {theme,setTheme} = useContext(ThemeContext)
    const [showLinks,setShowLinks] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [subCode, setSubCode] = useState('ARTS')
    const [charCode,setCharCode] = useState('A')
    const [courseNumber, setCourseNumber] = useState('000')
    const [enroll,setEnroll] = useState('Enroll')
    const [success,setSuccess] = useState(null)
    const [isLoading,setLoading] = useState(false)



    const user = loggedInUser
    const navigate = useNavigate()
    const logout = () => {
      localStorage.removeItem('jsonwebtoken')
      localStorage.removeItem('theme')
      navigate('/login')
      setLoggedInUser()
    }
    const [newCourse, setNewCourse] = useState({
      courseCode:'',
      courseName:'',
      instructorEmail:loggedInUser?.email,
      status:'Unapproved',
      description:''
    })

    var subjectCode =['ARTS','CSCI','DSCI','ENGR','INFO','STAT']
    var courseChar = ['A','B','C','G','P','Y','Z']

function changeTheme(){
  localStorage.setItem('theme',theme === 'light'? 'dark':'light')
  setTheme(theme === 'light'? 'dark':'light')
}

const handleSubmit = async() => {
  setLoading(true)
  let code = subCode+' '+charCode+'-'+courseNumber
  setNewCourse({...newCourse,courseCode: code})
  console.log(newCourse)
  await axios.post(`${BASE_URL}/course/createCourse`,newCourse
  ).then((res)=> {
    console.log(res)
    setLoading(false)
    setSuccess(true)
  },(error) => {
    console.log(error)
    setLoading(false)
    setSuccess(false)
  })
  
  setTimeout(()=> {
    setShowModal(false)
    setSuccess(null)
  },5000)
}

const handleEnroll =() => {
  navigate(`/${enroll.toLowerCase()}`)
  setEnroll(enroll === 'Enroll'?'Dashboard':'Enroll')
}

const [originalCourses, setOriginalCourses] = useState([])
useEffect(() => {
  const elem = document.getElementById("mainList")
  let childs = Array(document.getElementById("mainList").children)
  // let childs = []
  // for(let i = 0; i < )
  console.log(childs);
  setOriginalCourses(childs[0])
}, [])

function checkUrl ()
{
  const curUrl = window.location.pathname
  console.log(curUrl)
  if(curUrl === "/")
  {
    console.log("heejkhnsjkdhnfsjkdfnksjdnfjkn")  
    return false
  }
  return true
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}
// Original Author: Pranav Mandke
function handleClick(val)
{
  const elem = document.getElementById("mainList")
  console.log(originalCourses);
  // const newElem = document.createElement("div")
  let childs = []
  // childs = originalCourses.filter((elem)=>{
  //   return (elem.outerHTML).toLowerCase().includes(val.toLowerCase());

  // })
  for(let i = 0; i < originalCourses.length; i++)
  {
    if((originalCourses[i].outerHTML).toLowerCase().includes(val.toLowerCase()))
    {
      originalCourses[i].style.display = ""
      childs.push(originalCourses[i])
    }
    else
    {
      originalCourses[i].style.display = "none"
      childs.push(originalCourses[i])
    }
  }
  console.log(childs,originalCourses);
  removeAllChildNodes(document.getElementById("mainList"))
  childs.map((elem)=>{
    document.getElementById("mainList").appendChild(elem)
    return true
  })
  
}
  return (
    <>
    {checkUrl()==true?
      <>
    <div className='navbar-container'>
      {loggedInUser?.type === 'Instructor' ? 
      <div className='create-assignment'>
        <button className={`create-btn create-btn-${theme}`} onClick={() => setShowModal(true)}>Create New Course</button>
      </div>
      :
      <div className='empty-div'></div>}
      {loggedInUser ? 
      <div className="search-button">
        <input placeholder='Search'/>
      </div> : 
      <div className='empty-div'></div>}
      <div className="navbar-buttons">
        <div className='theme-btn-wrapper'>
              <button className={`theme-btn theme-btn-${theme}`} onClick = {() => changeTheme()}>{theme === 'light' ? 
              <DarkModeOutlinedIcon style={{color: '#ff1b1b', scale: '80%'}}/> : <LightModeOutlinedIcon style={{color: "#ff1b1b", scale: '80%'}}/>
              }</button>
          </div>
          {loggedInUser?
            <div className='user-profile'>
            <div className={`profile-dropdown-${theme}`} onClick={() => setShowLinks(!showLinks)}>
              <Avatar {...stringAvatar(user.fname+" "+user.lname)}/>
              <KeyboardArrowDownRoundedIcon />
            </div>
            {showLinks?
            <div className={`profile-dropdown-list dropdown-list-${theme}`}>
              <a href="#" onClick={logout}>Logout</a>
              <a href='/profile'>Profile</a>
              <a href= {`${loggedInUser.type === 'Admin' ? '/admindashboard':'/dashboard'}`}>Dashboard</a>
            </div>:<></>}
          </div>
          :<></>}
      </div>
      <Modal 
        show={showModal} 
        onHide={()=> setShowModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create New Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isLoading ? <Loading />
            : 
            success === null ?
            <div>
            <div className='input-div'>
              <label>Course Code</label>
              <div className='course-code-div'>
                <select id="subject-code" value = {subCode} onChange={(e) => setSubCode(e.target.value)}>
                  {subjectCode.map((code) => (<option>{code}</option>))}
                </select>
                <select id="subject-char" value = {charCode} onChange={(e) => setCharCode(e.target.value)}>
                  {courseChar.map((code) => (<option>{code}</option>))}
                </select>
                <input type='number' value={courseNumber} onChange={(e) => setCourseNumber(e.target.value)}/>
              </div>
            </div>
            <div className='input-div'>
              <label>Course Name</label>
              <input value={newCourse.courseName} onChange={(e) => setNewCourse({...newCourse,courseName:e.target.value})}/>
            </div>
            <div className='input-div'>
              <label>Email</label>
              <input value={newCourse.instructorEmail} disabled/>
            </div>
            <div className='input-div'>
              <label>Description</label>
              <textarea value={newCourse.description} onChange={(e) => setNewCourse({...newCourse,description:e.target.value})}/>
            </div>
          </div>
          : <Success success={success}/>}
          </Modal.Body>
          <Modal.Footer>
            <div>
              <button className='btn-red' onClick={()=>handleSubmit()}>Create</button>
            </div>
          </Modal.Footer>
        </Modal>
    </div>
    </>
    :<></>}
        </>
  )
}

export default Navbar
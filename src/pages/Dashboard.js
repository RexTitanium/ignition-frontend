import React, { useContext, useEffect, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './styles/calendar.css'
import './styles/dashboard.css'
import ThemeContext from '../context/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import NotifBox from './NotifBox'
import BASE_URL from '../shared/baseURL'
import axios from 'axios'

function Dashboard({user,graduateDegreeData,setCourseData}) {
  let events=[]
  const navigate = useNavigate()
  for(let i = 0; i<17; i++){
    events.push({
      id:i,
      title: "Applied Algorithms CSCI-B 505",
      start: new Date(2023,7,21+7*i,9,45,0,0),
      end: new Date(2023,7,21+7*i,11,0,0,0)
    },
    {
      id:i,
      title: "Applied Algorithms CSCI-B 505",
      start: new Date(2023,7,23+7*i,9,45,0,0),
      end: new Date(2023,7,23+7*i,11,0,0,0)
    },
    {
      id:i,
      title: "Software Engineering CSCI-C 501",
      start: new Date(2023,7,21+7*i,11,30,0,0),
      end: new Date(2023,7,21+7*i,12,45,0,0)
    },
    {
      id:i,
      title: "Software Engineering CSCI-C 501",
      start: new Date(2023,7,23+7*i,11,30,0,0),
      end: new Date(2023,7,23+7*i,12,45,0,0)
    },
    {
      id:i,
      title: "Elem AI CSCI-B 556",
      start: new Date(2023,7,21+7*i,18,30,0,0),
      end: new Date(2023,7,21+7*i,19,45,0,0)
    },
    {
      id:i,
      title: "Elem AI CSCI-B 556",
      start: new Date(2023,7,23+7*i,18,30,0,0),
      end: new Date(2023,7,23+7*i,19,45,0,0)
    })
  }
/*   useEffect(() => {
    courseData()
  }, [])
  
  const courseData = async () =>
  {
    const data = [];
    const endpoint = `${BASE_URL}/courses/courseInfo/` + user?.email;
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
  } */




  const locales = {
    "en-US": require("date-fns/locale/en-US")
  }

  const announcements= [{
    subjectName: 'Applied Algorithms',
    courseCode: 'CSCI B-505',
    message: "There will be no class this coming week due to Thanksgiving break"
  }, 
  {
    subjectName: 'Elem AI',
    courseCode: 'CSCI B-551',
    message: "Your marks have been uploaded. Check fast"
  }]

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  })

  const {theme} = useContext(ThemeContext)
  return (
    <div className={`dashboard-${theme}`}>
      <div className={`dashboard-calendar-${theme}`}>
        <Calendar
          className={`calendar-${theme}`}
          localizer={localizer}
          events={events}
          style={{width: 900, height: 600}}
            />
      </div>
      <div className='dashboard-notif-sub'>
        <div className='notif-wrapper'>
          <div className={`notif-title-${theme}`}>Notifications</div>
          <div className='notif-bounding-box'>{announcements.map((ann) => {
            console.log(ann)
            return (
          <div><NotifBox notif={ann}/></div>
          )})}</div>
        </div>
        <div className='subject-cards'>
          {graduateDegreeData.map((subject)=> {
            return(
              <div className={`card-link-${theme}`}>
                <Link className='subject-card-link' to={`/dashboard/${subject.subjectID}`}>
                  <RenderSubjectCard subject={subject} theme={theme}/>
                </Link>
              </div>);
          })}
        </div>
      </div>
    </div>
  )
}

function RenderSubjectCard({subject,theme}) {
  return(
    <div className='subject-card-container'>
      <div className={`subject-card-wrapper card-${theme}`}>
        <div className={`subject-card-header card-header-${theme}`}>
          <div className='subject-name'>{subject.subjectName} ({subject.subjectID})</div>
          <div className='subject-semester'>{subject.semester}</div>
        </div>
        <div className={`subject-card-color card-${subject.letterGrade}`}>
        </div>
        <div className='subject-details'>
          <div className='subject-grade'>{subject.percentage}%</div>
          <div className='subject-professor'>{subject.professorName}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard
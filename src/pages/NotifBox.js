import React from 'react'
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import { Link } from 'react-router-dom';

function NotifBox({notif}) {
    console.log(notif)
  return (
    <div>
        <div className='notif-box'>
            <Link to={`/dashboard/${notif.courseCode}`}>
                <div className="notif-header">
                    <div className="notif-icon">
                        <NotificationsActiveRoundedIcon />
                    </div>
                    <div className="notif-subject">{notif.subjectName} <FiberManualRecordRoundedIcon style={{ color: "green", scale: "50%" }} /> </div>    
                </div>
                <div className="notif-message">
                    {notif.message}
                </div>
            </Link>
        </div>
    </div>
  )
}

export default NotifBox
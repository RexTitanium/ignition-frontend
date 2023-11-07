import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import './styles/indcard.css';

function IndCard({ card }) {
  const { theme } = useContext(ThemeContext);
  // Dummy assignments data
  const assignments = [
    { title: 'Assignment 1', dueDate: 'Oct 15, 2023' },
    { title: 'Assignment 2', dueDate: 'Nov 5, 2023' },
    { title: 'Assignment 3', dueDate: 'Nov 20, 2023' },
    { title: 'Assignment 4', dueDate: 'Dec 1, 2023' },
    { title: 'Assignment 5', dueDate: 'Dec 15, 2023' },
    { title: 'Assignment 6', dueDate: 'Jan 5, 2024' },
    { title: 'Assignment 7', dueDate: 'Jan 20, 2024' },
    // { title: 'Assignment 8', dueDate: 'Feb 5, 2024' },
    // { title: 'Assignment 9', dueDate: 'Feb 20, 2024' },
    // { title: 'Assignment 10', dueDate: 'Mar 5, 2024' },
    // Add more assignments as needed
  ];

  return (
    <div className="canvas-layout">
      <div className="canvas-sidebar">
        <nav>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href={`${card.subjectID}/syllabus`}>Syllabus</a></li>
            <li><a href= {`${card.subjectID}/announcements`}>Announcements</a></li>
            <li><a href={`${card.subjectID}/modules`}>Modules</a></li>
            <li><a href={`${card.subjectID}/discussions`}>Discussions</a></li>
            <li><a href={`${card.subjectID}/assignments`}>Assignments</a></li>
            <li><a href={`${card.subjectID}/quizzes`}>Quizzes</a></li>
            <li><a href={`${card.subjectID}/grades`}>Grades</a></li>
            <li><a href={`${card.subjectID}/files`}>Files</a></li>
            <li><a href={`${card.subjectID}/pages`}>Pages</a></li>
            <li><a href={`${card.subjectID}/people`}>People</a></li>
          </ul>
        </nav>
      </div>
      <div className="canvas-content">
        <div className="canvas-header">
          <h1>{card.subjectName}</h1>
          <p>Subject ID: {card.subjectID}</p>
          <p>Grade: {card.letterGrade}</p>
        </div>
        <div className="canvas-description">
          <p>
            Welcome to CSCI-P465/565 (Software Engineering for Information Systems I & Software Engineering I).
            This co-located course will be your introduction to the world of Software Engineering and will revolve around a semester-long project.
            I hope that you will enjoy learning about software design/development methodologies (including requirements specification, analysis, design, implementation of software systems, and software quality assurance), and skills that can be used in any development environment.
            Please note that this course remains a "work in progress" and this website will be updated frequently. Please take a moment to review the course syllabus for additional details. In case you have a question, please drop me a note at seiffert@iu.edu
          </p>
          <p>Course Format: In-Person: This is an in-classroom course and all lectures will be given in class. Students are expected to attend each lecture in the classroom. Some work will have to be completed on specific days/times.  We will provide expansive opportunities for students to be able to interact with the instructor, associate instructors and customers in-person and via online zoom meetings. The preference will be to meet in-person, but given the changing nature of the pandemic, online zoom meetings will be used when convenient or even necessary.

          While there are two group presentations for each team, this semester these presentations will be recorded and viewed online. This is due to the size of the course and the amount of time required for each team to do a presentation. It would take too much class time to get through them all.
          </p>
        </div>
      </div>
      <div className="canvas-assignments">
        <h2>My Assignments</h2>
        {assignments.map((assignment, index) => (
          <div key={index} className="assignment-card">
            <h3>{assignment.title}</h3>
            <p>Due Date: {assignment.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndCard;
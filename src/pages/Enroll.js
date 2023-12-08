import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BASE_URL from '../shared/baseURL';
import './styles/enrollment.css'
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Success from '../components/Success';
import Loading from '../components/Loading';
const Enroll = ({enrolledCourses}) => {
    const user = useSelector(state => state.loggedInUser)
    const [courseData, setCourseData] = useState()
    const [success,setSuccess] = useState(null)
    const [isLoading,setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
        try {
            let courseResponse = await axios.get(`${BASE_URL}/course/allCourses`);
            courseResponse = courseResponse.data;

            let parsedCourses = [];
            let enrolledIds = []
            for (let enrollments of enrolledCourses) {
                enrolledIds.push(enrollments.courseID)
            }
            for(let course of courseResponse)
            {
                if (!enrolledIds.includes(course.courseId)) {
                    parsedCourses.push(
                        {
                            courseCode: course?.courseCode,
                            courseID: course?.courseId,
                            courseName: course?.courseName,
                            professorName: course.instructorEmail,
                            description: course?.description,
                        }
                        )
                }
            }
            setCourseData(parsedCourses);
        } catch (error) {
            console.error('Error fetching Courses:', error);
        }
        };

        fetchData();
    }, []);


  const [data, setData] = useState()
  const [showModal, setShowModal] = useState(false)
  const handleOpenModal = (course) => {
    setData(course)
    setShowModal(true)
  }
  
  const handleEnroll =async() => {
    setLoading(true)
    await axios.post(`${BASE_URL}/enrollments`,{
        userID: user.email,
        courseName: data.courseName
    }).then((res) => {
        console.log(res)
        setLoading(false)
        setSuccess(true)
    }, (error) => {
        console.log(error)
        setLoading(false)
        setSuccess(false)
    })

    setTimeout(()=> {
        setShowModal(false)
        setSuccess(null)
      },5000)
    }

  return (
    <div className='enrollment-container'>
        {courseData?.map((course) => (
            <div className='enrollment-wrapper' onClick={() => handleOpenModal(course)}>
                <div className="enrollment-heading">
                    <div>{course?.courseName}</div>
                    <div>{course?.courseCode}</div>
                </div>
                <div>{course?.professorName}</div>
            </div>
        ))}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{data?.courseName} ({data?.courseCode})</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? <Loading />
                :
                success === null ?
                <div>
                    <div>Taught By: {data?.professorName}</div>
                    <div>
                        <p>{data?.description}</p>
                    </div>
                </div>
                :
                <Success success={success}/>}
            </Modal.Body>
            <Modal.Footer>
                <button className='btn-red' onClick={() => handleEnroll()}>Enroll</button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Enroll
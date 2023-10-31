import React, {useContext, useState} from 'react'
import OTPPage from './OTPPage';
import EnterPassword from './EnterPassword'
import { useSelector } from 'react-redux';
import './styles/resetPass.css'
import ThemeContext from '../context/ThemeContext';

function ResetPassword({setResetPassword}) {
  const [email,setEmail] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [profile, setProfile] = useState([]);
  const {theme} = useContext(ThemeContext)

  const renderErrorMessage = () => {
      <p>{errorMessage}</p>
  }

  const users = useSelector(state => state.users)

  const handleOTPRequest = (user) => {
    /* Enter Your OTP request code */
    const OTP = Math.floor(Math.random() * 9000 + 1000)
    setSentOtp(OTP);
    alert(OTP)
    setProfile(user)
  }
  const handleOTPPage = (user) => {
    handleOTPRequest(user)
    setShowOTP(true)
  }

  const handleReset =() => {
    const payload = users.find((user) => user.email === email);

    if (payload) {
      handleOTPPage(payload);
    }
    else {
      setErrorMessage('This email is not in our system');
      console.log(errorMessage)
    }
  };

  return (
    <div>
      {showOTP ? 
       otpVerified ? <EnterPassword user={profile}/>: <OTPPage setShowOTP = {setShowOTP} handleOTPRequest={handleOTPRequest} sentOtp = {sentOtp} setOtpVerified={setOtpVerified}/> :
      <div className='email-handler'>
        <div>
          <button className="btn-red" onClick={() => setResetPassword(false)}>Back</button>
        </div>
        <div className='enter-email'>
          <label>Enter registered email</label>
          <div className='email-submit'>          
            <input type='email' value={email} onChange={e => setEmail(e.target.value)}/>
            <button className= "btn-black" onClick={handleReset}>submit</button>
          </div>
          <div>{renderErrorMessage}</div>
        </div>
      </div>}
    </div>
  )
}

export default ResetPassword
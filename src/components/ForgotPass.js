import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi'

function ForgotPass() {

  let {register, handleSubmit} = useForm();
  const navigate = useNavigate()
  let [err, setErr] = useState("")
  let [user, setUser] = useState("")
  let [email, setEmail] = useState(true)
  let [otp, setOtp] = useState(false)
  let [newPass, setNewPass] = useState(false)
  let [show, setShow] = useState(false)
  let [repeatShow, setRepeatShow] = useState(false)

  function submitEmail(obj){
    setUser(obj.userid)
    axios.post('http://chtvthme.onrender.com/user-api/sendemail', obj)
    .then(res => {
        if(res.data.success === true){
            setErr("")
            localStorage.setItem('otpToken', res.data.otpToken)
            localStorage.setItem('hashedOtp', res.data.otp)
            alert('OTP sent successfully to your mail..')
            // navigate('/verifyotp')
            setEmail(false)
            setOtp(true)
        }else setErr(res.data.message)
    })
    .catch(err => setErr(err.message))
  }

  function submitOtp(obj){

    obj.token = localStorage.getItem('otpToken')
    obj.hashedOtp = localStorage.getItem('hashedOtp')
    axios.post('http://chtvthme.onrender.com/user-api/verifyotp', obj)
    .then(res => {
        if(res.data.success === true){
            setErr("")
            localStorage.clear()
            setOtp(false)
            setNewPass(true)
        }else setErr(res.data.message)
    })
    .catch(err => setErr(err.message))
  }

  function submitNewPass(obj){
    obj.userid = user;
    axios.post('http://chtvthme.onrender.com/user-api/update-password', obj)
    .then(res => {
        if(res.data.success===true){
            alert(res.data.message)
            navigate('/login')
        }else setErr(res.data.message)
    })
    .catch(err => setErr(err.message))
  }

  return (
    <div className='container d-flex align-items- bg-danger bg-opacity-10 p-0' style={{height: "640px"}}>
        <img alt='' src='https://cdn.dribbble.com/users/267404/screenshots/3713416/media/6a7e93dc6473c86476d748e82f917cea.png?compress=1&resize=800x600&vertical=center'
      className='' style={{position: "relative", objectFit: "cover", height: "100%", width: "50%"}}
      />
      <img alt='' style={{position: "absolute", width: "10%", borderRadius: "50%", top: "45%", left: "23%"}} className='' src='http://static.vecteezy.com/system/resources/previews/009/116/929/non_2x/cvm-logo-cvm-letter-cvm-letter-logo-design-initials-cvm-logo-linked-with-circle-and-uppercase-monogram-logo-cvm-typography-for-technology-business-and-real-estate-brand-vector.jpg' />
      <div className='d-flex flex-column justify-content-center align-items-center w-100'>
        {err.length !== 0 && <p className='lead text-danger'>{err}</p>}
        {email && <form className='d-flex flex-column' onSubmit={handleSubmit(submitEmail)}>
            <h1 className='lead fs-1'>Forgot Password</h1>
            <input type='text' className='rounded mt-3' placeholder='Enter UserID' {...register('userid', {required: true})} />
            <input type='email' className='rounded mt-3' placeholder='Enter your Email' {...register('email', {required: true})} />
            <label> <p className='text-end'>*The email should be corresponding <br/>email of the userid</p></label>
            <Button className='btn btn-success m-auto' type='submit' style={{width: '40%'}}>Send OTP</Button>
        </form>}
        {otp &&
        <form className='d-flex flex-column' onSubmit={handleSubmit(submitOtp)}>
            <h1 className='lead fs-1'> <u> Verify OTP </u></h1>
            <input type='number' className='rounded mt-3' placeholder='Enter OTP' {...register('otp', {required: true})} />
            <Button className='btn btn-success m-auto mt-3' type='submit' style={{width: '40%'}}>Submit</Button>
        </form>}

        {newPass && 
            <form className='d-flex flex-column' onSubmit={handleSubmit(submitNewPass)}>
                <h1 className='lead fs-1'><u> Reset Password </u></h1>
                <div className='d-flex p-0'>
                <input type={show ? 'text' : 'password'} className='rounded mt-3' placeholder='Enter New Password' {...register('newPass', {required: true})} />
                <NavLink onClick={() => setShow(!show)} className='mt-3 ms-2 nav-link pt-1'>{show ? <BiHide className='fs-4 m-0' />  :<BiShow className='fs-4 m-0' />}</NavLink>
                </div>
                <div className='d-flex p-0'>
                <input type={repeatShow ? 'text' : 'password'} className='rounded mt-3' placeholder='Repeat New Password' {...register('repeatPass', {required: true})} />
               <NavLink onClick={() => setRepeatShow(!repeatShow)} className='mt-3 ms-2 nav-link pt-1'>{repeatShow ? <BiHide className='fs-4 m-0' />  :<BiShow className='fs-4 m-0' />}</NavLink>  
                </div>
                <Button className='btn btn-success m-auto mt-3' type='submit' style={{width: '80%'}}>Update Password</Button>
            </form>
        }
      </div>
    </div>
  )
}

export default ForgotPass
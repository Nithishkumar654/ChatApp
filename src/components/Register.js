import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi'

function Register() {


  let {register, handleSubmit} = useForm();
  let [err, setErr] = useState("")
  const navigate = useNavigate()
  let [show, setShow] = useState(false)
  let [repeatShow, setRepeatShow] = useState(false)


  function submitRegister(obj){
    
    axios.post('http://localhost:3500/user-api/register', obj)
    .then(res => {
      if(res.data.success === true){
        navigate('/login')      
      }else{
        setErr(res.data.message)
      }
    })
    .catch(err => setErr(err.message))
  }

  return (
    <div className='container d-flex align-items- bg-danger bg-opacity-10 p-0' style={{height: "640px"}}>
      <img alt='' src='https://cdn.dribbble.com/users/267404/screenshots/3713416/media/6a7e93dc6473c86476d748e82f917cea.png?compress=1&resize=800x600&vertical=center'
      className='' style={{position: "relative", objectFit: "cover", height: "100%", width: "50%"}}
      />
      <img alt='' style={{position: "absolute", width: "10%", borderRadius: "50%", top: "45%", left: "23%"}} className='' src='https://static.vecteezy.com/system/resources/previews/009/116/929/non_2x/cvm-logo-cvm-letter-cvm-letter-logo-design-initials-cvm-logo-linked-with-circle-and-uppercase-monogram-logo-cvm-typography-for-technology-business-and-real-estate-brand-vector.jpg' />
      <div className='d-flex align-items-center justify-content-center' style={{width: "50%"}}>
        <form className='d-flex flex-column' style={{position: ""}} onClick={handleSubmit(submitRegister)} >
          <h1 className='display-6 mb-5 text- text-center'> <u> Register Here </u> </h1>
          {err.length !== 0 && <p className='lead text-danger'>*{err}</p>}
          <input type='text' className='mt-3 rounded fs-5 ps-2' placeholder='Enter your Name' {...register('username', {required: true})} />
          <label className='ms-5 text-dark'>*This will be used as your Name in the Chats</label>
          <input type='text' className='mt-3 rounded fs-5 ps-2' placeholder='Create a UserID' {...register('userid', {required: true})} />
          <label className='ms-5 text-dark'>*This will be used as your UserID in the Chats</label>
          <input type='email' className='mt-3 rounded fs-5 ps-2' placeholder='Enter your Email' {...register('email', {required: true})} />
          <input type='number' className='mt-3 rounded fs-5 ps-2' placeholder='Enter Mobile Number' {...register('mobile')} />
          <div className='d-flex p-0'>
          <input type={show ? 'text' : 'password'} className='mt-3 rounded fs-5 ps-2'  placeholder='Enter Password' {...register('password', {required: true})} />
          <NavLink onClick={() => setShow(!show)} className='mt-3 ms-2 nav-link pt-1'>{show ? <BiHide className='fs-4 m-0' />  :<BiShow className='fs-4 m-0' />}</NavLink>
          </div>
          <div className='d-flex p-0'>
          <input type={repeatShow ? 'text' : 'password'} className='mt-3 rounded fs-5 ps-2' placeholder='Repeat Password' {...register('repeatPassword', {required: true})} />
          <NavLink onClick={() => setRepeatShow(!repeatShow)} className='mt-3 ms-2 nav-link pt-1'>{repeatShow ? <BiHide className='fs-4 m-0' />  :<BiShow className='fs-4 m-0' />}</NavLink>
          </div>
          <label className='mt-3 text-dark lead fs-5'>Upload your profile pic</label>
          <input type='file' />
          <Button className='btn btn-success text-center m-auto mt-3' type='submit' style={{width: "35%"}} > Submit </Button>
        </form>
      </div>
    </div>
  )
}

export default Register
import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { BiHide, BiShow } from 'react-icons/bi'

function Login() {

  let {register, handleSubmit} = useForm();
  let [err, setErr] = useState("")
  const navigate = useNavigate()
  let [show, setShow] = useState(false)

  function submitLogin(obj){

    axios.post('http://localhost:3500/user-api/login', obj)
    .then(res => {
      if(res.data.success === true){
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', res.data.user)
        setErr("")
        navigate('/chat')
      }else{
        setErr(res.data.message)
      }
    })
    .catch(error => setErr(error.message))

  }
  return (
    <div className='container d-flex bg-danger bg-opacity-10' style={{height: "650px"}}>
      <div className='' style={{width: "50%"}}>
        <img alt='' src='https://img.freepik.com/free-vector
        /dialogue-chat-clouds-speech-bubble-icon-from-lines-triangles-particle-style-design-low-poly-technology-devices
        -people-communication-concept-blue-background_587448-471.jpg?size=626&ext=jpg&ga=GA1.1.503943051.1686425803&semt=ais'
        className='rounded-4' style={{position: "relative", top: "20%", left: "10%", width: '100%'}}/>

        <h1 className='text-warning' style={{position: "absolute", top: "60%", left: "18%"}}>
          <i>C V M</i>
          <p className='lead ms-5 text-white'> - Cht Vth Me</p>
        </h1>
        <img alt='' className = '' style={{width: "10%", position: "absolute", top: "32%", left: "13%", borderRadius: "50%"}} 
        src = 'https://static.vecteezy.com/system/resources/previews/009/116/929/non_2x/cvm-logo-cvm-letter-cvm-letter-logo-design-initials-cvm-logo-linked-with-circle-and-uppercase-monogram-logo-cvm-typography-for-technology-business-and-real-estate-brand-vector.jpg' />
      </div>
      <div className='d-flex flex-column justify-content-center align-items-center' style={{width: "50%"}}>
        <form onSubmit={handleSubmit(submitLogin)} className='text-center d-flex flex-column justify-content-center align-items-center'>
          <h1 className='display-5'> Login To <i>Cht</i></h1>
          {(err.length !== 0) && <p className='lead text-danger'>*{err}</p>}
          <div className='d-flex flex-column'>
            <input type = "text" placeholder = 'Enter UserId' className='rounded mt-3 fs-5 ps-2' {...register('userid', {required: true})} />
            <div className='d-flex p-0'>
            <input type={show ? 'text' : 'password'} placeholder = 'Enter Password' className='rounded mt-3 fs-5 ps-2' {...register('password', {required: true})} />
            <NavLink onClick={() => setShow(!show)} className='mt-3 ms-2 nav-link pt-1'>{show ? <BiHide className='fs-4 m-0' />  :<BiShow className='fs-4 m-0' />}</NavLink>
            </div>
          </div>
          <Button type='submit' className='mt-3 btn btn-success'> Login </Button>
          <NavLink className='text-danger mt-3 ms-auto' to = '/forgotPass'> Forgot Password </NavLink>
        </form>
      </div>
    </div>
  )
}

export default Login
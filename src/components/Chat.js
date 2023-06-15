import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap'
import {AiOutlineSearch, AiFillCloseCircle} from 'react-icons/ai';
import EmptyChat from './EmptyChat';
import Conversation from './Conversation';
import { NavLink, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg'
import EditProfile from './EditProfile';

function Chat() {

  let [userids, setUserId] = useState([]);
  let [person, showPerson] = useState({});
  let [host, setHost] = useState("")
  const navigate = useNavigate()
  let [show, setShow] = useState(false)
  let [message, setMessage] = useState("")
  let [showModal, setShowModal] = useState(false)

  useEffect(() => {
    
    const token = localStorage.getItem('token')

    axios.post('http://localhost:3500/user-api/pathjump', {token: token})
    .then(res => {
        
      if(res.data.success !== true){
          alert(res.data.message)
          localStorage.clear();
          navigate('/login')
      }

    })
    .catch(err => alert("Error: " + err.message))

    setHost(localStorage.getItem('user'))

    axios.get('http://localhost:3500/user-api/get-users')
    .then(res => setUserId(res.data.users))
    .catch(err => console.log(err))
  
  },[showModal])

  function handleChange(event){
    axios.get('http://localhost:3500/user-api/get-users')
    .then(res => setUserId(res.data.users.filter(obj => obj.userid.includes(event.target.value))))
    .catch(err => console.log(err))
  }

  const showChat = (obj) =>{
    showPerson(obj)
  }

  function handleShow(){
    setShow(false)
    setMessage("")
  }


  return (
    <div className='d-flex' style={{height: "640px", position: 'relative'}}>
      <div style={{width: '35%'}} className = 'chats pt-2 h-100 overflow-auto bg-secondary bg-opacity-10'>

        <h1 className='lead fs-3 text-center m-2'> Welcome <i><b>{host}</b></i>..!!</h1>
        <div className='ms-2 d-flex align-items-center mt-1'>
          <div className='w-100'>
            <AiOutlineSearch className='fs-3'/>
            <input type = 'search' className= 'w-75 rounded ps-2' onChange={handleChange} placeholder='Search by userid..' />
          </div>
          <CgProfile className='me-2 fs-4' onClick={() => setShowModal(!showModal)} style={{cursor: 'pointer'}} />
        </div>
        <hr/>
        <p className='lead ms-2'>Your Chats</p>
        <hr className='w-50 ms-1 m-0'/>
        <div className='' style={{position: 'relative'}}>
        {
          userids.map(obj => obj.userid !== host &&  
            <>
            <NavLink onClick = {() => showChat(obj)} className = 'p-3 pb-0 d-flex w-100 text-start text-dark nav-link'>
              <p className='fs-4 d-inline'> {obj.userid} </p>
              <p className='fs-6 d-inline ms-auto mt-5 mb-0'>{obj.username}</p>
            </NavLink>  
            <hr className='ms-1 w-75 m-0' />
            </>
          )
          }
        </div>

        { show && 
         <div className='d-inline d-flex p-0 bg-secondary' style={{position: 'absolute', bottom: '0', left: '1rem'}}>
          <p className='lead text-warning me-2'> {message} </p>
          <AiFillCloseCircle className='fs-4' onClick={handleShow} />
         </div>
        }


        <EditProfile show = {showModal} setShow = {setShowModal} />

      </div>


      <div style={{width: '65%'}} className = 'conversations'>

        {
          person.userid === undefined ? <EmptyChat /> : <Conversation setShow = {setShow} setMessage = {setMessage} person = {person} />
        }
      </div>
      
    </div>
  )
}

export default Chat
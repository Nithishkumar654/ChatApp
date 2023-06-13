import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap'
import {AiOutlineSearch} from 'react-icons/ai';
import EmptyChat from './EmptyChat';
import Conversation from './Conversation';
import { NavLink, useNavigate } from 'react-router-dom';

function Chat() {

  let [userids, setUserId] = useState([]);
  let [person, showPerson] = useState({});
  let [host, setHost] = useState("")
  const navigate = useNavigate()

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
  
  },[])

  function handleChange(event){
    axios.get('http://localhost:3500/user-api/get-users')
    .then(res => setUserId(res.data.users.filter(obj => obj.userid.includes(event.target.value))))
    .catch(err => console.log(err))
  }

  const showChat = (obj) =>{
    showPerson(obj)
  }

  return (
    <div className='d-flex border border-dark' style={{height: "640px"}}>
      <div style={{width: '35%'}} className = 'chats pt-2 border overflow-auto bg-secondary bg-opacity-10'>
        <div className='ms-2'>
          <AiOutlineSearch className='fs-2'/>
          <input type = 'search' className= 'w-75 rounded ps-2' onChange={handleChange} placeholder='Search by userid..' />
        </div>
        <hr/>
        <p className='lead ms-2'>Your Chats</p>
        <hr className='w-50 ms-1 m-0'/>
        <div>
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
      </div>


      <div style={{width: '65%'}} className = 'conversations'>

        {
          person.userid === undefined ? <EmptyChat /> : <Conversation person = {person} />
        }
      </div>
      
    </div>
  )
}

export default Chat
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'

function NavigationBar() {

  let [host, setHost] = useState("")

  let navigate = useNavigate()


  const activeLink = {
    color: 'orange',
    fontSize: '120%'
  }
  const inactiveLink = {
    color: 'white'
  }
  function handleLogout(){
    localStorage.clear()
    navigate('/login')
  }
  useEffect(() => {

    const token = localStorage.getItem('token')

    axios.post('https://chtvthme.onrender.com/user-api/pathjump', {token: token})
    .then(res => {
        
      if(res.data.success !== true){
          localStorage.clear();
          setHost("")
          navigate('/')
      }else{
        const user = localStorage.getItem('user')
        setHost(user)
      }

    })
    .catch(err => alert("Error: " + err.message))

  },[localStorage.getItem('user')])
  return (
    <div className=''>
      <Navbar bg="primary" className='' variant="dark">
        <Container>
        <NavLink className='nav-link m-2' to = '/'>
          <Navbar.Brand className='text-dark fs-3 ' style={{position: "relative"}}>
            <img alt='' className = 'me-2 border' style={{borderRadius: '50%', width: "5%"}} src = "https://static.vecteezy.com/system/resources/previews/009/116/929/original/cvm-logo-cvm-letter-cvm-letter-logo-design-initials-cvm-logo-linked-with-circle-and-uppercase-monogram-logo-cvm-typography-for-technology-business-and-real-estate-brand-vector.jpg"/>
            <p className='d-inline mt-1 ' style={{position: "absolute"}}>Cht Vth Me</p></Navbar.Brand>
          </NavLink>
          <Nav className="ms-auto">
          {
            host.length === 0 ?
              <div className='d-flex align-items-center'>
                <NavLink className='nav-link' to = '/' 
                  style={({isActive}) => {return isActive ? activeLink : inactiveLink}}>Home</NavLink>
                <NavLink className='nav-link' to = '/login' 
                  style={({isActive}) => {return isActive ? activeLink : inactiveLink}}>Login</NavLink>
                <NavLink className='nav-link' to = '/register'
                   style={({isActive}) => {return isActive ? activeLink : inactiveLink}}>Register</NavLink>
              </div>
              :
              <Button className='text-white btn btn-danger' onClick={handleLogout}>Logout</Button>
            }
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavigationBar
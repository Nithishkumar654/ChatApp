import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate()
  useEffect(() => {
    const user = localStorage.getItem('user')
    if(user) navigate('/chat')
  })

  return (
    <div className='border h-100 d-flex justify-content-center align-items-center'>
      <img className='' src='https://f4n3x6c5.stackpathcdn.com/article/what-is-mern-stack/Images/The%20MERN%20Stack.jpg' />
    </div>
  )
}

export default Home
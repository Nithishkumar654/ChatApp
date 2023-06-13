import React from 'react'
import NavigationBar from './NavigationBar'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div  className='container p-0 shadow'>

      <NavigationBar/>
      
      <div className='' style={{height: "640px"}}>
        <Outlet />
      </div>      
    </div>
  )
}

export default RootLayout
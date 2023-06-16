import React from 'react'

function EmptyChat() {
  return (
    <div className='d-flex' >
      <img alt='' style={{height: "40rem", width: "100%", position: "relative"}} className='rounded d-flex justify-content-center' src='https://plus.unsplash.com/premium_photo-1677939082123-414edc6aaf25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80' />
      <div className='text-warning' style={{position: "absolute", top: "75%", left: "55%"}}>
        <h1 className='display-3'><i> Cht Vth Me </i></h1>
          <div className='ms-5 ps-5'><p className='m-0 ms-auto text-white'>- where people fall in love with Chat </p></div>
      </div>
    </div>
  )
}

export default EmptyChat
import React, { useState } from 'react'
import Header from './Header'
import Convo from './Convo'
import Footer from './Footer'

function Conversation({setShow, setMessage, person }) {

  let [send, setSend] = useState(false)
  return (
    <>
        <Header person = {person} />
        <Convo person = {person} send = {send} setSend = {setSend} setShow = {setShow} setMessage = {setMessage} />
        <Footer person = {person} setSend = {setSend} />
    </>
  )
}

export default Conversation
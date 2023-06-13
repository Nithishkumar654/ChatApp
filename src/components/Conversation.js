import React, { useState } from 'react'
import Header from './Header'
import Convo from './Convo'
import Footer from './Footer'

function Conversation({ person }) {

  let [send, setSend] = useState(false)
  return (
    <>
        <Header person = {person} />
        <Convo person = {person} send = {send} setSend = {setSend} />
        <Footer person = {person} setSend = {setSend} />
    </>
  )
}

export default Conversation
import React, { useEffect, useState } from 'react'
import { BsEmojiSunglasses } from 'react-icons/bs'
import { GrAttachment } from 'react-icons/gr'
import { AiOutlineSend } from 'react-icons/ai'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react'
import { Button, DropdownButton, OverlayTrigger, Popover } from 'react-bootstrap';
import { GiCancel } from 'react-icons/gi'

function Footer({ person, setSend }) {

  let {register, handleSubmit} = useForm();
  let [host, setHost] = useState("")
  let [show, setShow] = useState(false)
  let [value, setValue] = useState("")
  let [disabled, setDisabled] = useState(false)
  let [file, setFile] = useState(null)

  function submitMessage(){

    let obj = {}
    value = value.trimStart()
    
    obj.message = value
    obj.senderId = host;
    obj.receiverId = person.userid;

    let today = new Date();

    let hrs = today.getHours().toString()
    if(hrs.length === 1)
      hrs = "0".concat(hrs);
    
    let mins = today.getMinutes().toString()
    if(mins.length === 1)
      mins = "0".concat(mins)
    
    let secs = today.getSeconds().toString()
    if(secs.length === 1)
      secs = "0".concat(secs);

    obj.time = hrs + ':' + mins + ':' + secs
    
    if(value.length !== 0){
      axios.post('http://localhost:3500/conversation-api/send-message', obj)
      .then(res => {
        //console.log(res)
        setSend(true)
        setValue("")
      })
      .catch(err => console.log(err.message))
    }else{
      setValue("")
    }
  }

  function handleChange(event){
    setValue(event.target.value)
  }

  function handleEmoji(emoji){
    setValue(value+emoji.emoji)
  }

  function handleFile(event){
    setFile(event.target.files[0])
    setValue(event.target.files[0].name)
    setDisabled(true)
  }

  function submitFile(){

    let obj = {}

    obj.senderId = host;
    obj.receiverId = person.userid;

    let today = new Date();

    let hrs = today.getHours().toString()
    if(hrs.length === 1)
      hrs = "0".concat(hrs);
    
    let mins = today.getMinutes().toString()
    if(mins.length === 1)
      mins = "0".concat(mins)
    
    let secs = today.getSeconds().toString()
    if(secs.length === 1)
      secs = "0".concat(secs);

    obj.time = hrs + ':' + mins + ':' + secs

    obj.fileType = file.name.slice(-3)

    obj.fileName = file.name;

    let fd = new FormData()

    fd.append('details', JSON.stringify(obj))

    fd.append('photo', file)

    
    axios.post('http://localhost:3500/conversation-api/send-file', fd)
    .then(res => {
      setSend(true)
      setValue("")
      setDisabled(false)
    })
    .catch(err => console.log(err.message))

  }

  function cancelFile(){
    setValue("")
    setDisabled(false)
  }

  useEffect(() => {
    setHost(localStorage.getItem('user'))
    setShow(false)
  }, [])
  return (
    <form className='footer d-flex align-items-center bg-dark bg-opacity-10' style={{height: '10%'}} onSubmit={handleSubmit(submitMessage)}>
      <div className='emojiAndFile mt-1 ms-4'>
        <OverlayTrigger trigger={'click'} key={'top'} placement = {'top'} rootClose={true}
          overlay={ 
          <Popover><EmojiPicker onEmojiClick={handleEmoji} /></Popover> }
        >
          <div className='d-inline btn p-0 m-0 border border-none'>
            <BsEmojiSunglasses style={{cursor: 'pointer'}} className='fs-4 ms-2 text-dark'/>
          </div>
        </OverlayTrigger>

        <OverlayTrigger trigger={'click'} key={'top'} placement = {'top-start'} rootClose={true}
          overlay={
            <Popover className='d-block'>
              <input type='file' onInput={handleFile} />
            </Popover>
          }>
            <div className='d-inline'>
              <GrAttachment style={{cursor: 'pointer'}} className='fs-4 ms-2 text-dark'/>
            </div>
        </OverlayTrigger>
      </div>
      <div className='border w-75 ms-3'>
        
        <input type='text' className='fs-6 ps-2 pt-1 pb-1 mt-2 w-100 rounded'
         style={{wordBreak: "break-word"}} placeholder='Type a Message...' value={value} disabled={disabled} onChange={handleChange}  />

      </div>
      {
      disabled === false ?
        <Button className='btn btn-success pt-0 pb-1 mt-2 ms-2' onClick={submitMessage}>
        <AiOutlineSend className='fs-6' /></Button> :
        <>
          <Button className='btn btn-success pt-0 pb-1 mt-2 ms-2' onClick={submitFile}>
          <AiOutlineSend className='fs-6' /></Button>
          <Button className='btn btn-secondary pt-0 pb-1 mt-2 ms-2' onClick={cancelFile}>
          <GiCancel className='fs-6' /></Button>
        </>
      }
    </form>
  )
}

export default Footer
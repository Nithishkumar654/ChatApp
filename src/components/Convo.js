import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Convo({ person, send, setSend }) {

  let [messages, setMessages] = useState();
  let [host, setHost] = useState("")

  useEffect(() => {

    setHost(localStorage.getItem('user'))

    let hosting = localStorage.getItem('user')
    
    axios.post('http://localhost:3500/conversation-api/get-messages', {host: hosting, person: person.userid})
    .then((response) => {
      
      setMessages(response.data.chat)
      
      setSend(false)

    })
    .catch(err => console.log(err.message))

  }, [send, person])


  return (
    <div className = 'border d-flex flex-column overflow-y-scroll pb-2' style = {{height: "82%"}}>
      <div className='mt-auto'>
        {
          messages && messages.map(obj => 
            obj.senderId === host ?
            <div className='ms-auto pe-3 mb-1 d-flex' style={{width: "60%", wordBreak:"break-word"}}>
              
              <div className='d-inline-block ms-auto fs-6 border border-dark d-flex lead m-0 bg-success p-3 pt-1 pb-1 rounded text-white'> 
                { obj.message ? <p className='m-0 me-2'>{obj.message}</p> 
                : <> <img src={obj.image} style={{width: '90%'}} /> </>}
                <p className='m-0 d-inline-block my-auto pt-2 ms-auto text-end' style={{fontSize: "10px"}}>{obj.time}</p></div>
              
            </div>
             :
             <div className='ps-3 mb-1' style={{width: "60%", wordBreak:"break-word"}}>
              <div className='lead m-0 fs-6 d-inline-block text-white bg-secondary p-3 pt-1 pb-1 rounded'>
                {obj.message ? <p className='m-0 me-1 d-inline'> {obj.message} </p> 
                : <><img src={obj.image} style={{width: '90%'}} /> </>}
                <p className='m-0 d-inline-block my-auto pt-2' style={{fontSize: "10px"}}> {obj.time} </p></div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Convo
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoMdDownload } from 'react-icons/io'

const pdf = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png'
const png = 'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE='
const jpg = 'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE='
const lsx = 'https://windowsfileviewer.com/images/types/xlsx.png'

function Convo({ person, send, setSend, setShow, setMessage }) {

  let [messages, setMessages] = useState();
  let [host, setHost] = useState("")

  const scrollRef = useRef(null);

  useEffect(() => {

    setHost(localStorage.getItem('user'))

    let hosting = localStorage.getItem('user')
    
    axios.post('http://localhost:3500/conversation-api/get-messages', {host: hosting, person: person.userid})
    .then((response) => {
      
      setMessages(response.data.chat)
      setShow(false)
      setMessage("")
      setSend(false)
      
    })
    .catch(err => console.log(err.message))

  }, [send, person])

  
  function handleDownload(obj){

    axios.post('http://localhost:3500/conversation-api/download-file', {id: obj._id})
    .then(res => {

      setShow(true)
      setMessage(res.data.message)
      
    })
    .catch(err => {
      setShow(true)
      setMessage(err.message)
    })

  }


  return (
    <div className = 'd-flex flex-column overflow-y-scroll pb-2 bg-white' style = {{height: "82%"}}>
      <div ref={scrollRef} className='mt-auto'>
        {
          messages && messages.map(obj => 
            obj.senderId === host ?
            <div className='ms-auto pe-3 mb-1 d-flex' style={{width: "60%", wordBreak:"break-word"}}>
              
              <div className='d-inline-block ms-auto fs-6 lead m-0 bg-success pt-1 pb-1 rounded text-white'
                  style={{position: 'relative'}}> 
                { obj.message ?
                <div className='d-flex flex-wrap ms-2 me-2' style={{position: 'relative'}}>
                   <p className='m-0 me-2' style={{position: 'relative'}}>{obj.message}</p>
                   <p className='m-0 mt-auto p-0 d-inline' 
                    style={{fontSize: "10px"}}>{obj.time}</p>
                </div>
                : 
                <div className='d-flex me-1 ms-1' style={{position: 'relative'}}>
                <div className='d-flex flex-wrap justify-content-between' style={{position: 'relative'}}> 
                <div style={{position: 'relative'}}>
                  {obj.fileType === 'pdf' && <img src={pdf} style={{position: 'relative', width: '50px', height: '50px'}} /> }
                  {obj.fileType === 'png' && <img src={png} style={{position: 'relative', width: '50px', height: '50px'}} /> }
                  {obj.fileType === 'jpg' && <img src={jpg} className='' style={{position: 'relative', width: '50px', height: '50px'}} /> }
                  {obj.fileType === 'lsx' && <img src={lsx} style={{position: 'relative', width: '50px', height: '50px'}} /> }
                
                    <IoMdDownload onClick={() => handleDownload(obj)} className='fs-3 text-dark'
                        style={{position: 'absolute', bottom: '1rem', left: '0', borderRadius: '50%', cursor: 'pointer'}} />
                  </div>
                  <div className='ms-1'>{obj.fileName}</div>
                </div>
                    <div className=' mt-auto' 
                    style={{width: '40px', position: 'relative', fontSize: "10px"}}>{obj.time}</div>
                </div>
                }
                </div>
              
            </div>
             :
             <div className='ps-2 mb-1' style={{width: "60%", wordBreak:"break-word"}}>
              <div className='lead m-0 fs-6 d-inline-block text-white bg-secondary p-3 pt-1 pb-1 rounded' style={{position: 'relative'}}>
                {obj.message ? 
                <div className='d-flex flex-wrap ms-2 me-2 d-inline' style={{position: 'relative'}}>
                  <p className='m-0 me-2' style={{position: 'relative'}}>{obj.message}</p>
                  <p className='m-0 mt-auto p-0 d-inline' 
                  style={{fontSize: "10px"}}>{obj.time}</p>
                </div> 
                : 
                <div className='d-flex ms-1 me-1' style={{position: 'relative'}}>
                <div className='d-flex flex-wrap justify-content-between' style={{position: 'relative'}}>
                  <div style={{position: 'relative'}}>
                  {obj.fileType === 'pdf' && <img src={pdf} style={{position: 'relative', width: '50px', height: '50px'}} /> }
                  {obj.fileType === 'png' && <img src={png} style={{position: 'relative', width: '50px', height: '50px'}} /> }
                  {obj.fileType === 'jpg' && <img src={jpg} style={{position: 'relative', width: '50px', height: '50px'}} /> }
                  {obj.fileType === 'lsx' && <img src={lsx} style={{position: 'relative', width: '50px', height: '50px'}} /> }
                    
                  <IoMdDownload onClick={() => handleDownload(obj)} className='fs-3 text-dark'
                     style={{position: 'absolute', bottom: '1rem', left: '0', borderRadius: '50%', cursor: 'pointer'}}  /> 
                  </div>
                    <p className='ms-1'>{obj.fileName}</p>
                  </div>
                  <div className='mt-auto d-inline'
                    style={{position: 'relative', fontSize: "10px", width: '50px'}}> {obj.time} </div>
                </div>
                }
            </div>
            </div>
          )
        }
        </div>
      </div>
  )
}

export default Convo
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdDownload } from 'react-icons/io'
import { AiFillFileText, AiFillFilePpt, AiFillFileWord, AiFillFileImage, AiFillFilePdf, AiFillFileZip, AiFillFileExcel, AiFillFileUnknown } from 'react-icons/ai'
import { Spinner } from 'react-bootstrap';

function Convo({ person, send, setSend, setShow, setMessage }) {

  let [messages, setMessages] = useState();
  let [host, setHost] = useState("")
  let [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {

    setHost(localStorage.getItem('user'))
    setIsLoaded(true)

    let hosting = localStorage.getItem('user')
    
    axios.post('https://chtvthme.onrender.com/conversation-api/get-messages', {host: hosting, person: person.userid})
    .then((response) => {
      
      setMessages(response.data.chat)
      setShow(false)
      setMessage("")
      setSend(false)
      setIsLoaded(false)
      
    })
    .catch(err => console.log(err.message))

  }, [send, person])


  if(isLoaded){
    return <div className='bg-white d-flex' style = {{height: "82%"}}>
      <Spinner className='m-auto' animation="border" variant="primary" />
        </div>
  }

  
  const handleDownload = async(obj) => {

    try{
    
      let response =  await axios.post('https://chtvthme.onrender.com/conversation-api/download-file', obj, {responseType: 'blob'})

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', obj.fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setShow(true)
      setMessage('File Downloaded Successfully..')

    }catch(err){
      setShow(true)
      setMessage('Error while downloading the file..')
    }

  }


  return (
    <div className = 'd-flex flex-column overflow-y-scroll pb-2 bg-white' style = {{height: "82%"}}>
      {messages.length!==0 ? <div className='mt-auto'>
        {
           messages.map(obj => 
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
                  {
                  
                  obj.fileType === 'application/pdf' ? <AiFillFilePdf style={{position: 'relative', width: '50px', height: '50px'}} /> :
                  (obj.fileType.includes('image') ? <AiFillFileImage style={{position: 'relative', width: '50px', height: '50px'}} /> :
                  (obj.fileType.includes('application/vnd') ? <AiFillFileExcel style={{position: 'relative', width: '50px', height: '50px'}}/> :
                  (obj.fileType.includes('zip') ? <AiFillFileZip style={{position: 'relative', width: '50px', height: '50px'}} /> :
                  (obj.fileType.includes('text/plain') ? <AiFillFileText style={{position: 'relative', width: '50px', height: '50px'}} /> :
                  (obj.fileType.includes('application/powerpoint') ? <AiFillFilePpt style={{position: 'relative', width: '50px', height: '50px'}} /> :
                  (obj.fileType.includes('application/msword') ? <AiFillFileWord style={{position: 'relative', width: '50px', height: '50px'}} /> :
                   <AiFillFileUnknown style={{position: 'relative', width: '50px', height: '50px'}} />
                  ))))))

                  }
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
                  {
                  
                  obj.fileType === 'application/pdf' ? <AiFillFilePdf style={{position: 'relative', width: '50px', height: '50px'}} /> :
                  (obj.fileType.includes('image') ? <AiFillFileImage style={{position: 'relative', width: '50px', height: '50px'}} /> :
                  (obj.fileType.includes('application/vnd') ? <AiFillFileExcel style={{position: 'relative', width: '50px', height: '50px'}}/> :
                  (obj.fileType.includes('zip') ? <AiFillFileZip style={{position: 'relative', width: '50px', height: '50px'}} /> :
                  (obj.fileType.includes('text/plain') ? <AiFillFileText style={{position: 'relative', width: '50px', height: '50px'}} /> :
                  (obj.fileType.includes('application/powerpoint') ? <AiFillFilePpt style={{position: 'relative', width: '50px', height: '50px'}} /> :
                  (obj.fileType.includes('application/msword') ? <AiFillFileWord style={{position: 'relative', width: '50px', height: '50px'}} /> :
                   <AiFillFileUnknown style={{position: 'relative', width: '50px', height: '50px'}} />
                  ))))))

                  }
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
          )}
        </div>
        :
        
          <p className='lead text-secondary m-auto'> Chat is Empty </p>
      
      }
      </div>
  )
}

export default Convo

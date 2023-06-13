import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FiMoreVertical } from 'react-icons/fi'

function Header({person}) {
  return (
    <div className = 'd-flex p-2 ps-5 bg-dark bg-opacity-25' style = {{height: '8%'}} >
      <div>
        <p className='fs-5'>{person.username.charAt(0).toUpperCase() + person.username.slice(1)}</p>
      </div>
      <div className = 'ms-auto'>
        <AiOutlineSearch className='m-2 fs-5' />
        <FiMoreVertical className='m-2 fs-5' />
      </div>
    </div>
  )
}

export default Header
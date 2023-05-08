import React from 'react'

import './CSSFiles/Modal.css'

const Modal = ({contract , setModalOpen}) => {

  const sharing = () => {



  }

  return (

    <>
    
    <div className="modalBackground">

    <div className="modalContainer">

    <div className="title">Share Access</div>

    <div className="body">

    <input type="text" className='address' placeholder='Enter Address'/>

    </div>

    <form id='myForm'>

    <select id="selectNumber">

    <option className='address'>People With Access</option>

    </select>

    </form>

    <div className="footer">

    <button onClick={() => {setModalOpen(false)}} id='cancelBtn'>Close</button>

    <button onClick = {sharing}>Share Access</button>


    </div>

    </div>

    </div>
    
    
    </>

    )
}

export default Modal
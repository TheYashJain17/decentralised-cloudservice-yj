import React from 'react'

import './CSSFiles/Modal.css'

const Modal = ({contract , setModalOpen}) => {

  const sharing = () => {

    const address = document.getElementById('address').value;

    contract.allowUser(address);

    alert(`Access has been given to ${address}`)

  }

  return (

    <>
    
    <div className="modalBackground">

    <div className="modalContainer">

    <div className="title">Share Access</div>

    <div className="body">

    <input type="text" className='address' id='address' placeholder='Enter Address'/>

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
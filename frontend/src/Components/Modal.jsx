import { useEffect } from 'react'

import React  from 'react'

import {toast , ToastContainer} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

import './CSSFiles/Modal.css'

const Modal = ({contract , setModalOpen}) => {

  const sharing = () => {

    const address = document.getElementById('address').value;

    contract.allowUser(address);

    // alert(`Access has been given to ${address}`)

    toast.success(`Access Has Been Given To ${address};`)



  }

  useEffect(() => {

    const accessList = async() => {

      const addressList = await contract.shareAccessList();
      
      let select = document.getElementById("selectNumber");

      const options = addressList;

      for(let i=0; i<options.length; i++){

        let option = options[i];

        let element = document.createElement("option");

        element.textContent = option;

        element.value = option;

        select.appendChild(element);

      }

    }

    contract && accessList();

  } , [])

  return (

    <>

    <ToastContainer/>
    
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
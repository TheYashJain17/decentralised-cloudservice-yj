import React, { useState } from 'react'

import './CSSFiles/Display.css';

const Display = ({account , contract}) => {

  const [images , setImages] = useState('');

  const getData = async() => {

    let imagesArray;

    const enteredAddress = document.getElementById('enteredAddress').value;

    if(enteredAddress){

      imagesArray = await contract.displayImages(enteredAddress);

      console.log(imagesArray)

    }
    else{

      imagesArray = await contract.displayImages(account);

    }

    const isEmpty = Object.keys(imagesArray).length === 0;

    if(!isEmpty){

      const str = imagesArray.toString();

      const strArray = str.split(','); 

      console.log(str);

      console.log(strArray);

      const images = strArray.map((item , index) => {

        return(

          <a href={item} key={index} target='_blank'>

          <img key={index} src = {`https:${item.substring(6)}`} alt="new" className='image-list' />

          </a>

        )

      })

      setImages(images);

    }
    else{

      alert("No Image To Display");

    }
  }

  return (

    <>
    
    <div className="image-list">{images}</div>
    
    <input type="text" placeholder='Enter The Address' id='enteredAddress' className='address' />

    <button className='center button' onClick={getData}>Get Images</button>

    </>

    )
}

export default Display
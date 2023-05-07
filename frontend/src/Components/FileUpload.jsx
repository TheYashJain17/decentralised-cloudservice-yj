import React, { useState } from 'react'

import axios from 'axios';

import './CSSFiles/FileUpload.css';

const FileUpload = ({contract , account , provider}) => {

  const [file , setFile] = useState(null);

  const [fileName , setFileName] = useState("No Image Selected");

 
const handleSubmit = async(event) => {

  event.preventDefault();

  if(file){

    try {
      
      const formData = new FormData();

      formData.append("file" , file);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `1497f8478336bc3f8af5`,
          pinata_secret_api_key: `e844b392506d06ad3100ad806a6e65ccbc5c7e1d4bf8356480e1d002f1b753d1`,
          "Content-Type": "multipart/form-data",
        },
      });
      const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

      contract.addYourImage(ImgHash);

      alert("Successfully Image Uploaded");

      setFileName("No image selected");

      setFile(null);


    } catch (error) {

      alert("Image Not Uploaded To Pinata")

      console.log(error);
      
    }


  }


} 


const retrieveFileInformation = (element) => {

  const data = element.target.files[0];

  console.log(data);
  
  const reader = new window.FileReader();

  reader.readAsArrayBuffer(data);

  reader.onloadend = () => {

    setFile(element.target.files[0])

  }

  setFileName(element.target.files[0].name)

  element.preventDefault();

}

  return (
    <div className='top'>
    
    <form className="form" onSubmit={handleSubmit}>

    <label htmlFor="file-upload" className='choose'>Choose Image</label>

    <input disabled={!account} type="file" id='file-upload' name="data" onChange={retrieveFileInformation} />

    <span className='textArea'>Image: {fileName}</span>

    <button disabled={!file} type='submit' className='upload'>Upload Image</button>

    </form>
    
    </div>

    )
}

export default FileUpload
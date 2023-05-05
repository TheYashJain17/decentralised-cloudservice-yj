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

        formData.append("File" , file);

        const resultedFile = await axios({

          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data : formData,
          headers : {

            pinataApiKey: "afffda434230e6aed6bc",

            pinataSecretApiKey: "707166a1a06ac9e751d49489a675b5ce1ae677261e40fb8b957c7f8d7d0f715a",

            "Content-Type": "multipart/form-data"

          }
        })

        const imageHash = `ipfs://${resultedFile.data.IpfsHash}`

        await contract.addYourImage(imageHash);

        alert("Image Uploaded Successfully");

        setFileName("No Image Selected");

        setFile(null);

        
      } catch (error) {

        alert(error.name)
        
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

}

  return (
    <div className='top'>
    
    <form className="form" onSubmit={handleSubmit}>

    <label htmlFor="file-upload" className='choose'>Choose Image</label>

    <input disabled={!account} type="file" id='file-upload' name="data" onChange={retrieveFileInformation} />

    <span className='textArea'>Image: {fileName}</span>

    <button disabled={!file && !account} type='submit' className='upload'>Upload Image</button>

    </form>
    
    </div>

    )
}

export default FileUpload
import './App.css';

import {ethers} from 'ethers';

import Artifacts from '../src/artifacts/contracts/CloudService.sol/cloudService.json';

import FileUpload from './Components/FileUpload';

import Display from './Components/Display';

import Modal from './Components/Modal';

import { useEffect, useState } from 'react';

function App() {

  const [account , setAccount] = useState('');

  const [contract , setContract] = useState(null);

  const [provider , setProvider] = useState(null);

  const [modalOpen , setModalOpen] = useState(false);

  const {ethereum} = window;


  const connectWallet = async() => {

    try {

      
      if(ethereum){

        const account = await ethereum.request({method : "eth_requestAccounts"});

        setAccount(account);

      }

      
    } catch (error) {
      
      console.log(error.message)

    }
  }

  useEffect(() => {

    const getContractInstance = async() => {

    const contractAddress = "0x7C3DaDBE6a3c9A5897b3355B0E7d8302eC9ce5A0";
    
    const ABI = Artifacts.abi;


    if(ethereum && account!=0){  

      const provider = new ethers.providers.Web3Provider(ethereum);

      const signer = await provider.getSigner();
  
      const contract = new ethers.Contract(contractAddress , ABI , signer);

      setContract(contract);

      setProvider(provider);

      console.log(account , provider , contract);

    }

  }

  getContractInstance();
    

  } , [account]);
 

  return (
    <>
    
    <button onClick={connectWallet}>Connect Wallet</button>
    
    </>
  );
}

export default App;

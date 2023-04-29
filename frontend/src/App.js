import './App.css';

import {ethers} from 'ethers';

import Artifacts from '../src/artifacts/contracts/CloudService.sol/cloudService.json';

import FileUpload from './Components/FileUpload';

import Display from './Components/Display';

import Modal from './Components/Modal';
import { useEffect, useState } from 'react';

function App() {

  const contractAddress = "0x7C3DaDBE6a3c9A5897b3355B0E7d8302eC9ce5A0";

  const ABI = Artifacts.abi;

  const [account , setAccount] = useState('');

  const [contract , setContract] = useState(null);

  const [provider , setProvider] = useState(null);

  const [modalOpen , setModalOpen] = useState(false);


  useEffect(() => {

    const {ethereum} = window;

    const provider = new ethers.providers.Web3Provider(ethereum);

    const loadProvider = async() => {

        if(provider){

          await provider.send('eth_requestAccounts' , []);

          const signer = await provider.getSigner();

          const address = await signer.getAddress();

          setAccount(address);

          const contract = new ethers.Contract(contractAddress , ABI , signer);

          setContract(contract);

          console.log(contract);

          setProvider(provider);

        }
        else{

          alert("Please Install Metamask")

        }

    }

   provider && loadProvider();

  } , [])

  return (
    <>
    

    
    </>
  );
}

export default App;

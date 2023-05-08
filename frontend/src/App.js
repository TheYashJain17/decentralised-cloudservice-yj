import './App.css';

import {ethers} from 'ethers';

import Artifacts from '../src/artifacts/contracts/CloudService.sol/cloudService.json';

import FileUpload from './Components/FileUpload';

import Display from './Components/Display';

import Modal from './Components/Modal';

import { useEffect, useState } from 'react';

function App() {

  const [account , setAccount] = useState("");

  const [contract , setContract] = useState(null);

  const [provider , setProvider] = useState(null);

  const [modalOpen , setModalOpen] = useState(false);

  const {ethereum} = window;


  const connectWallet = async() => {

    if(ethereum){

      const accounts = await ethereum.request({method : "eth_requestAccounts"});

      setAccount(accounts[0]);

    }

  }


  const getContractInstance = async() => {

    if(ethereum && account != 0){

      const contractAddress = "0x7C3DaDBE6a3c9A5897b3355B0E7d8302eC9ce5A0";

      const ABI = Artifacts.abi;

      const provider = new ethers.providers.Web3Provider(ethereum);

      const signer = await provider.getSigner();

      const contract = new ethers.Contract(contractAddress , ABI , signer);

      setContract(contract);

      setProvider(provider);

      console.log(contract , signer , account);

    }

  }

  const getCurrentAccount = async() => {

    if(ethereum && account != 0){

      const currentAccounts = await ethereum.request({method : "eth_accounts"});

      setAccount(currentAccounts[0]);

    }

    

  }

  useEffect(() => {

    window.ethereum.on("accountsChanged" , (accounts) => {

      setAccount(accounts[0])

    })

    window.ethereum.on("chainChanged" , () => {

      window.location.reload();

    })

    getContractInstance();
    // getCurrentAccount();


  } , [account]);

  return (

    <>

    <Modal setModalOpen = {setModalOpen} contract = {contract}/>

    <div className='App'>

    <h1 style={{color:'black'}}>Decentralised CloudService</h1>
    
    <div className="bg"></div>
    <div className="bg bg2"></div>
    <div className="bg bg3"></div>

    
    <button onClick={connectWallet}>

    <span>

      {account.length > 0 ? `Connected: ${account.substring(0,6)}...${account.substring(38)} ` : `Connect Wallet`}

      </span>

    </button>

    <FileUpload provider = {provider} account = {account} contract = {contract}/>

    <Display account = {account} contract = {contract}/>

    
    </div>

    </>
  )

}


export default App;

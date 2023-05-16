import './App.css';

import {ethers} from 'ethers';

import Artifacts from '../src/artifacts/contracts/CloudService.sol/cloudService.json';

import FileUpload from './Components/FileUpload';

import Display from './Components/Display';

import Modal from './Components/Modal';

import About from './Components/About';

import { useEffect, useState } from 'react';

import {toast , ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [account , setAccount] = useState();

  const [contract , setContract] = useState(null);

  const [provider , setProvider] = useState(null);

  const [modalOpen , setModalOpen] = useState(false);

  const {ethereum} = window;


  const connectWallet = async() => {

    if(ethereum){

      const accounts = await ethereum.request({method : "eth_requestAccounts"});

      console.log(`Account We Getting After Connecting Wallet ${accounts[0]}`);

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

    if(typeof window != 'undefined' && typeof ethereum != 'undefined'){

      const currentAccounts = await ethereum.request({method : "eth_accounts"});

      if(currentAccounts.length > 0){

        setAccount(currentAccounts[0]);

        console.log(`Account from getCurrentAccount function is ${currentAccounts[0]}`);


      }
  

    }

    

  }

  useEffect(() => {

    window.ethereum.on("chainChanged" , (chainId) => {

      if(chainId !== '0x13881'){

        toast.error("Please Move To Mumbai Polygon Network");

        console.log("Please Move To Mumbai Polygon Network")

      }

      else{

        window.location.reload();

      }
  

    })

    window.ethereum.on("accountsChanged" , (accounts) => {

      window.location.reload();

      setAccount(accounts[0]);

    })

    
    getCurrentAccount();
   
    getContractInstance();

  } , [account]);


  return (

    <>

    <ToastContainer/>

    {

      !modalOpen && (<button className='share' onClick={() => setModalOpen(true)}>Share</button>)

    }{" "}

   {modalOpen && (<Modal setModalOpen = {setModalOpen} contract = {contract}/>)} 

    <div className='App'>

    <h1 style={{color:'black'}}>Decentralised CloudService</h1>
    
    <div className="bg"></div>
    <div className="bg bg2"></div>
    <div className="bg bg3"></div>

    
    <button className='connectWalletButton' onClick={connectWallet}>

    <span>

      {account && account.length > 0 ? `Connected: ${account.substring(0,6)}...${account.substring(38)} ` : `Connect Wallet`}

      </span>

    </button>

    <FileUpload provider = {provider} account = {account} contract = {contract}/>

    <Display account = {account} contract = {contract}/>

    <About/>

    
    </div>

    </>
  )

}


export default App;

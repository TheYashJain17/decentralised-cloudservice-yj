import React from 'react'

import './CSSFiles/About.css';

const About = () => {
  return (
    <div className='AboutContainer'>
        
        <h1 className='abouth1'>About</h1>

        <h3 className='abouth3'>
This Is A Decentralised-CloudService Platform Through Which You Can Upload Your Images In A Decentralised Way As Those Images Will Gonna Be Stored On IPFS Network.
To Upload Image First You Have To Connect Your Metamask Wallet With The Help Of ConnectWallet Button Then Choose The Image You Want To Upload And Then Click On Upload Image Then You Have To Pay The Fees In Matics(Mumbai Polygon) After All These Steps Your Image Will Gonna Upload Successfully.
With This DAPP You Can Also Allow Other People To View Your Iamges If You Want , You Just Have To Take The Metasmask Account Address Of That Particular Person To Whom You Want To Show Your Images And Then Click On Share Button And Inside The Address Bar Paste The Desired Address And Click On Share Access And Now That Person Can See Your Images , He/She Just Have To Take The Address Of Your Metamask Account Through Which You Have Uploaded The Images And Have To Put That Address Into The Address Bar And Then Have To Click On Get Images Button And Now That User Can See Your Images.
And If You Want To See Your Upload Images Just Click On Get Images And You Will Get All The Images You Have Uploaded Till Now Through That Particular Address.
        </h3>

    </div>
  )
}

export default About
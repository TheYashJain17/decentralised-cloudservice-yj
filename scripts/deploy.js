const hre = require("hardhat");

async function main() {

 const CloudService =  await hre.ethers.getContractFactory('cloudService');

 const contract = await CloudService.deploy();

 await contract.deployed();
  
  console.log(

    `The address of the contract is ${contract.address}`

  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// the address of the contract is : 0x7C3DaDBE6a3c9A5897b3355B0E7d8302eC9ce5A0

// the command for depolying the contract is : npx hardhat run --network mumbai scripts/depoly.js
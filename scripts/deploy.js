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

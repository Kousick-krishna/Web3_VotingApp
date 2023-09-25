const { ethers } = require("hardhat");
async function main() {
  const Voting = await ethers.deployContract("Voting",[["kousick","abi","ram","guhan"],90]);
  const voting = await Voting.waitForDeployment();
  const address = await voting.getAddress();
  console.log("contract address is", address);

}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });

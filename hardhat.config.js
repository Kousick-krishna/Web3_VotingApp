const { ethers } = require("ethers");
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
//require("@nomiclabs/hardhat-ethers");


const PRIVATE_KEY = "0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97";
module.exports = {
   solidity: "0.8.19",
   defaultNetwork: "hardhat",
   networks: {
      hardhat: {
       forking:{
         url: `https://eth-mainnet.g.alchemy.com/v2/hPEMz3KElSJVGtPdJPoLyovlA0groiDo`,
         accounts: [`0x${PRIVATE_KEY}`]
         
       } 
      }
   },
}
/*require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
//module.exports = {
  //solidity: "0.8.19",
//};


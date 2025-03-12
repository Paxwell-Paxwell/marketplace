import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";

const config: HardhatUserConfig = {
  solidity:{
    compilers: [
      {
        version: "0.8.28",
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },

    localhost: {
      chainId: 31337,
    },
  },

  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
};

export default config;

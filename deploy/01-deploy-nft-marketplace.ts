import { network } from "hardhat"
import { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } from "../helper-hardhat-config"
import { verify } from "../utils/verify"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const deployNftMarketplace: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const waitBlockConfirmations = developmentChains.includes(network.name)
      ? 1
      : VERIFICATION_BLOCK_CONFIRMATIONS;
  
    log("----------------------------------------------------");
    const args: any[] = [];
    const nftMarketplace = await deploy("NftMarketplace", {
      from: deployer,
      args: args,
      log: true,
      waitConfirmations: waitBlockConfirmations,
    });
  
    // Verify the deployment if not on a development chain and if ETHERSCAN_API_KEY exists.
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
      log("Verifying...");
      await verify(nftMarketplace.address, args);
    }
    log("----------------------------------------------------");
  };
  
  export default deployNftMarketplace;
  deployNftMarketplace.tags = ["all", "nftmarketplace"];
  
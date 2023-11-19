//import

// function deployFunc(hre) {
//     console.log("Testing");
// }

// module.exports.default = deployFunc;
// we're getting this { getNamedAccounts, deployments } from "hre"

const {
    networkConfig,
    developmentChains,
} = require("../helper-hardhat-config");
const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    // WHAT HAPPENS WHEN WE WANT TO CHANGE CHAINS ?
    // when going for localhost or hardhat network we want to use a mock

    // if chainId is X use address Y
    // if chainId is Z use address A
    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];

    let ethUsdPriceFeedAddress;
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    }

    // if contract doesnt exist, we deploy a minimal version of it for our local testing

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], // put price feed address here
        log: true,
    });
    log("-------------------------------------- ");
};

module.exports.tags = ["all", "fundme"];

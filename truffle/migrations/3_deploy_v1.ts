type Network = "development" | "kovan" | "mainnet";

const ConvertLib = artifacts.require("ConvertLib");
const GroceryCoin = artifacts.require("GroceryCoin");
const HelloWorld = artifacts.require("HelloWorld");

module.exports = async (deployer: Truffle.Deployer, _network: any) => {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, GroceryCoin);
  deployer.deploy(GroceryCoin);
  deployer.deploy(HelloWorld);

  const groceryCoin = await GroceryCoin.deployed();
  console.log(`GroceryCoin deployed at ${groceryCoin.address}`);
};

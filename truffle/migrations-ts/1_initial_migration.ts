const Migrations = artifacts.require("Migrations");

module.exports = async (deployer: Truffle.Deployer) => {
  deployer.deploy(Migrations);
};

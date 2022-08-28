"use strict";
const ConvertLib = artifacts.require("ConvertLib");
const GroceryCoin = artifacts.require("GroceryCoin");
const GroceryCoinBep20 = artifacts.require("GroceryCoinBep20");
const HelloWorld = artifacts.require("HelloWorld");
module.exports = async (deployer) => {
    deployer.deploy(ConvertLib);
    deployer.link(ConvertLib, GroceryCoin);
    deployer.deploy(GroceryCoin);
    deployer.deploy(HelloWorld);
    await deployer.deploy(GroceryCoinBep20);
    let contract = await GroceryCoinBep20.deployed();
    contract.issueToken(1000 * (10 ** 8));
    // deployer.deploy(Contract,constructor_param_1, constructor_param_2, ,constructor_param_3, ,constructor_param_etc);
};

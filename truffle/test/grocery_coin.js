const GroceryCoin = artifacts.require("GroceryCoin");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("GroceryCoin", function (/* accounts */) {
  it("should assert true", async function () {
    await GroceryCoin.deployed();
    return assert.isTrue(true);
  });
});

const GroceryCoinBep20 = artifacts.require("GroceryCoinBep20");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("GroceryCoinBep20", function (/* accounts */) {
  it("should assert true", async function () {
    await GroceryCoinBep20.deployed();
    return assert.isTrue(true);
  });
});

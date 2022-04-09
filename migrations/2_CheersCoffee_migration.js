// Help Truffle find `Donate.sol` in the `/contracts` directory
const Donate = artifacts.require("Donate");

module.exports = function(deployer) {
  // Command Truffle to deploy the Smart Contract
  deployer.deploy(Donate);
};

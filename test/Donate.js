const Donate = artifacts.require("Donate");
const utils = require("./helpers/utils");
const time = require("./helpers/time");
const expect = require("chai").expect;

contract("Donate", (accounts) => {
  let contract;
  const [userA, userB] = accounts;

  beforeEach(async () => {
    contract = await Donate.new();
  });

  it("should sum is sum of donations", async () => {
    const eth = web3.toWei(2, 'ether');
    await contract.donate({ from: userB, value: eth });
    const sum = await contract.sum({ from: userB });
    expect(sum).to.equal(eth);
  });
});






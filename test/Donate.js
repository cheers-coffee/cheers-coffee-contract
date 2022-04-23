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

  it("should receiveAddress is same as userA", async () => {
    const receiveAddress = await contract.getReceiveAddress({ from: userA });
    expect(receiveAddress.to.equal(userA));
  });

  it("should only owner can access to getReceiveAddress", async () => {
    assert.throws(await contract.getReceiveAddress({ from: userB }), "should throw");
  });

  it("should sum is sum of donations", async () => {
    const eth = web3.utils.toWei("2", 'ether');
    await contract.donate({ from: userB, value: eth });
    const sum = await contract.sum({ from: userB });
    expect(sum.toString()).to.equal(eth);
  });
});






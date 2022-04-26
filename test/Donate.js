const Donate = artifacts.require("Donate");
const utils = require("./helpers/utils");
const time = require("./helpers/time");
const { assert, should } = require("chai");
const expect = require("chai").expect;

contract("Donate", (accounts) => {
  let contract;
  const [userA, userB, userC] = accounts;

  beforeEach(async () => {
    contract = await Donate.new();
  });

  context("초기값 테스트", async () => {
    it("'ownerName'이 'goldfish'인가", async () => {
      const ownerName = await contract.ownerName({ from: userA });
      assert.equal(ownerName, "goldfish");
    });

    it("'goldfish'가 소유자 주소로 등록되어있는가", async () => {
      const ownerName = await contract.ownerName({ from: userA });
      const registered = await contract.getRegistered(ownerName, { from: userA });
      assert.equal(registered, userA);
    })

    it("'coffeePrice'가 0.01 ether인가", async () => {
      const eth = web3.utils.toWei("0.01", 'ether');
      const coffeePrice = await contract.coffeePrice({ from: userA });
      assert.equal(coffeePrice, eth);
    });
  })

  context("'changeCoffeePrice' 테스트", async () => {
    it("'coffeePrice'가 변경되었는가", async () => {
      await contract.changeCoffeePrice(1, { from: userA });
      const coffeePrice = await contract.coffeePrice({ from: userA });
      assert.equal(coffeePrice, 1);
    });

    // it("should owner can access changeCoffeePrice", async () => {
    //   await contract.changeCoffeePrice(1, { from: userB }).should.be.rejected();
    // });
  });

  context("'changeReceiveAddress' 테스트", async () => {
    it("등록된 주소가 실제로 바뀌는가", async () => {
      await contract.changeReceiveAddress(userC, { from: userA });
      const ownerName = await contract.ownerName({ from: userA });
      const registered = await contract.getRegistered(ownerName, { from: userA });
      assert.equal(registered, userC);
    });

    it("주소 변경 이후 실제 기부 시에 돈이 정상 전송되는가", async () => {
      await contract.changeReceiveAddress(userC, { from: userA });

      const ownerName = await contract.ownerName({ from: userA });
      const beforeBalance = await web3.eth.getBalance(userC);
      const eth = web3.utils.toWei("0.01", 'ether');

      await contract.donate(ownerName, { from: userB, value: eth });

      const afterBalance = await web3.eth.getBalance(userC);
      
      assert.equal(afterBalance - beforeBalance, eth);
    });
  });

  // it("should sum is sum of donations", async () => {
  //   const eth = web3.utils.toWei("2", 'ether');
  //   await contract.donate({ from: userB, value: eth });
  //   const sum = await contract.sum({ from: userB });
  //   assert.equal(sum.toString(), eth);
  // });
});






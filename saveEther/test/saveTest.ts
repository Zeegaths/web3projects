
const { expect } = require("chai");
const { ethers } = require("hardhat");
import { Contract, Signer } from 'ethers';


describe("SaveEther", function () {
  let saveEther: Contract;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const SaveEther = await ethers.getContractFactory("SaveEther");
    saveEther = await SaveEther.deploy();
  });

  it("should accept and save amount", async function() {
    const depositAmount = ethers.parseEther("1.0");   

    const txDeposit = await saveEther.deposit({value:depositAmount}); 

    const receipt = await txDeposit.wait();
    const { status } = receipt;
    
    const ownerSavings = await saveEther.checkSavings(await owner.getAddress());
    const contractBalance = await saveEther.checkContractBal();

    expect(status).to.equal(1);
    expect(ownerSavings).to.equal(depositAmount);
    expect(depositAmount).to.equal(contractBalance);
  });

  it("withdraw amount from savings.", async function() {
    const depositAmount = ethers.parseEther("1.0");   

    const txDeposit = await saveEther.deposit({value: depositAmount}); 

    const receipt = await txDeposit.wait();
    const { status } = receipt;
    
    const ownerSavingsBefore = await saveEther.checkSavings(await owner.getAddress());
    const contractBalanceBefore = await saveEther.checkContractBal();

    const withdrawTx = await saveEther.withdraw();
    const withdrawReceipt = await withdrawTx.wait();
    const withdrawStatus = withdrawReceipt.status;

    const ownerSavingsAfter = await saveEther.checkSavings(await owner.getAddress());
    const contractBalanceAfter = await saveEther.checkContractBal();

    expect(status).to.equal(1);
    expect(ownerSavingsBefore).to.equal(depositAmount);
    expect(contractBalanceBefore).to.equal(depositAmount);

    expect(withdrawStatus).to.equal(1); // Check withdrawal transaction status
    expect(ownerSavingsAfter).to.equal(0); // Owner savings should be zero after withdrawal
    expect(contractBalanceAfter).to.equal(0); // Contract balance should be zero after withdrawal
});

it("send from savings.", async function() {
  const depositAmount = ethers.parseEther("2.0"); 
  const sendAmount = ethers.parseEther("1.0"); 

  const txDeposit = await saveEther.deposit({ value: depositAmount }); 

  const receipt = await txDeposit.wait();
  const { status } = receipt;
  
  const ownerSavingsBefore = await saveEther.checkSavings(await owner.getAddress());
  const contractBalanceBefore = await saveEther.checkContractBal();

  // Provide the required parameters for sendOutSaving
  const sendTx = await saveEther.sendOutSaving(await addr1.getAddress(), sendAmount);
  const sendReceipt = await sendTx.wait();
  const sendStatus = sendReceipt.status;

  const ownerSavingsAfter = await saveEther.checkSavings(await owner.getAddress());
  const contractBalanceAfter = await saveEther.checkContractBal();

  expect(status).to.equal(1);
  expect(ownerSavingsBefore).to.equal(depositAmount);
  expect(contractBalanceBefore).to.equal(depositAmount);

  expect(sendStatus).to.equal(1); // Check send transaction status
  expect(ownerSavingsAfter).to.equal(depositAmount - sendAmount); // Owner savings should be reduced after sending
  expect(contractBalanceAfter).to.equal(depositAmount - sendAmount); // Contract balance should be reduced after sending
});


});
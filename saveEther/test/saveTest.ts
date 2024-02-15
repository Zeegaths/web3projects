
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

it("return contract balance", async function() {
  const depositAmount1 = ethers.parseEther("1.0");   
  const depositAmount2 = ethers.parseEther("1.0");   
  const depositAmount3 = ethers.parseEther("1.0");   

  // Deposit three different amounts
  const txDeposit1 = await saveEther.deposit({value: depositAmount1});
  const txDeposit2 = await saveEther.deposit({value: depositAmount2});
  const txDeposit3 = await saveEther.deposit({value: depositAmount3});

  // Wait for transactions to be mined
  await txDeposit1.wait();
  await txDeposit2.wait();
  await txDeposit3.wait();

  const ownerSavings = await saveEther.checkSavings(await owner.getAddress());

  // Expect the ownerSavings to be the sum of all deposit amounts
  expect(ownerSavings).to.equal(depositAmount1 + depositAmount2 + depositAmount3);
});

it("return  balance", async function() {
  const depositAmount1 = ethers.parseEther("1.0");   
  const depositAmount2 = ethers.parseEther("2.0");   // Different amount for the second account
  const depositAmount3 = ethers.parseEther("1.0");   

  // Deposit amounts from different accounts
  const txDeposit1 = await saveEther.connect(addr1).deposit({value: depositAmount1});
  const txDeposit2 = await saveEther.connect(addr2).deposit({value: depositAmount2});
  const txDeposit3 = await saveEther.deposit({value: depositAmount3});

  // Wait for transactions to be mined
  await txDeposit1.wait();
  await txDeposit2.wait();
  await txDeposit3.wait();

  const contractBalance = await saveEther.checkContractBal();

  // Expect the contract balance to be the sum of all deposit amounts
  expect(contractBalance).to.equal(depositAmount1.add(depositAmount2).add(depositAmount3));
});

});
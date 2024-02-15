
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
});
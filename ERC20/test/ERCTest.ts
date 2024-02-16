import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, ContractFactory, Signer } from "ethers";
import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { MyToken } from "../typechain-types";
import { SaveERC20 } from "../typechain-types";


describe("SaveERC20", function () {
  let saveERC20: SaveERC20;
  let mytoken: MyToken;
 

  beforeEach(async function () {
    // 

    // Deploy ERC20 token for testing
    const MyToken = await ethers.getContractFactory("MyToken"); // Replace with the actual ERC20 token contract name
     mytoken = await MyToken.deploy();
    const Token = await ethers.getContractFactory("SaveERC20"); // Replace with the actual ERC20 token contract name
     saveERC20 = await Token.deploy(mytoken.target);

    
  });
  describe('deposit', ()=>{
    it('should deposit properly', async ()=>{
     const [owner, user1, user2] = await ethers.getSigners();
    const depositAmount = 1050
    await mytoken.connect(owner).approve(saveERC20.target, depositAmount)
    await saveERC20.connect(owner).deposit(depositAmount)
    const balance = await saveERC20.connect(owner).checkUserBalance(owner.address)
    const contractBal = await saveERC20.connect(owner).checkContractBalance()

    // console.log(balance, "user balance")
    // console.log(contractBal, 'contract balance')

    expect(balance).to.equal(depositAmount);

    })
  })


  describe('withdraw', ()=>{
    it('should withdraw properly', async ()=>{
     const [owner, user1, user2] = await ethers.getSigners();
    const depositAmount = 1050

    const withdrawalAmount = 100

    await mytoken.connect(owner).approve(saveERC20.target, depositAmount)
    await saveERC20.connect(owner).deposit(depositAmount)

    await saveERC20.connect(owner).withdraw(withdrawalAmount)

    const balance = await saveERC20.connect(owner).checkUserBalance(owner.address)
    const contractBal = await saveERC20.connect(owner).checkContractBalance()

    // console.log(balance, "user balance")
    // console.log(contractBal, 'contract balance')

    expect(balance).to.equal(depositAmount - withdrawalAmount);

    })
  })

  describe('user balance', ()=>{
    it('should return user balance', async ()=>{
     const [owner, user1, user2] = await ethers.getSigners();
    const depositAmount = 1050
    const depo = 200
    const depo2 = 200
   
    const withdrawalAmount = 100

    await mytoken.connect(owner).approve(saveERC20.target, depositAmount)
    await saveERC20.connect(owner).deposit(depo)
    await saveERC20.connect(owner).deposit(depo2)

    await saveERC20.connect(owner).withdraw(withdrawalAmount)

    const balance = await saveERC20.connect(owner).checkUserBalance(owner.address)
    const contractBal = await saveERC20.connect(owner).checkContractBalance()

    // console.log(balance, "user balance")
    // console.log(contractBal, 'contract balance')

    expect(balance).to.equal(depo + depo2 -withdrawalAmount );

    })
  })

  describe('user balance', ()=>{
    it('should return user balance', async ()=>{
     const [owner, user1, user2] = await ethers.getSigners();
    const depositAmount = 1050
    const depo = 200
    const depo2 = 200
   
    const withdrawalAmount = 100

    await mytoken.connect(owner).approve(saveERC20.target, depositAmount)
    await saveERC20.connect(owner).deposit(depo)
    await saveERC20.connect(owner).deposit(depo2)

    await saveERC20.connect(owner).withdraw(withdrawalAmount)

    const balance = await saveERC20.connect(owner).checkUserBalance(owner.address)
    const contractBal = await saveERC20.connect(owner).checkContractBalance()

    // console.log(balance, "user balance")
    // console.log(contractBal, 'contract balance')

    expect(balance).to.equal(depo + depo2 -withdrawalAmount );

    })
  })

  describe('contract balance', ()=>{
    it('should return contract balance', async ()=>{
    const [owner, user1, user2] = await ethers.getSigners();
    const depositAmount = 1050
    const depo = 200
    const depo2 = 200
   
    const withdrawalAmount = 100

    await mytoken.connect(owner).approve(saveERC20.target, depositAmount)
    
    await saveERC20.connect(owner).deposit(depo)
    await saveERC20.connect(owner).deposit(depo2)

    await saveERC20.connect(owner).withdraw(withdrawalAmount)

    const balance = await saveERC20.connect(owner).checkUserBalance(owner.address)
    const contractBal = await saveERC20.connect(owner).checkContractBalance()

    // console.log(balance, "user balance")
    // console.log(contractBal, 'contract balance')

    expect(contractBal).to.equal(depo + depo2 -withdrawalAmount );

    })
  })

  describe('ownerwithdraw', ()=>{
    it('should allow user to withdraw', async ()=>{
    const [owner, user1, user2] = await ethers.getSigners();
    const depositAmount = 1050
    const depo = 200
    const depo2 = 200
   
    const withdrawalAmount = 100

    await mytoken.connect(owner).approve(saveERC20.target, depositAmount)
  
    
    await saveERC20.connect(owner).deposit(depo)
    await saveERC20.connect(owner).deposit(depo2)

    await saveERC20.connect(owner).withdraw(withdrawalAmount)
    await saveERC20.connect(owner).ownerWithdraw(300)

    const balance = await saveERC20.connect(owner).checkUserBalance(owner.address)
    const withdrawal = await saveERC20.connect(owner).checkUserBalance(owner.address)
    const contractBal = await saveERC20.connect(owner).checkContractBalance()

    // console.log(balance, "user balance")
    // console.log(contractBal, 'contract balance')

    expect(contractBal).to.equal(0);

    })
  })
  
});

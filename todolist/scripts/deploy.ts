import { ethers } from "hardhat";

async function main() {  

  const todoList = await ethers.deployContract("TodoList");

  await todoList.waitForDeployment();

  console.log(
    `TodoList deployed to ${todoList.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

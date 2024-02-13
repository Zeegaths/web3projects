import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Todo List", function () { 
  async function deployTodoList() {    
    

    const TodoList = await ethers.getContractFactory("TodoList");
    const todolist= await TodoList.deploy();

    return { todolist };
  }

  describe("create Todo List", function () {
    it("Should set and get todo lists", async function () {
      const { todolist } = await loadFixture(deployTodoList);
     
      const tx = await todolist.createTodos("clean", "clothes");
      const todos = await todolist.getTodos();

      expect(todos).with.lengthOf(1);
      expect(todos[0]).eq("clean");
      expect(todos[1]).eq("clothes");
  
    });  
  });
});
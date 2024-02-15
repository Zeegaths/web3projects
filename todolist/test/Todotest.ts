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
      expect(todos[0][0]).eq("clean");
      expect(todos[0][1]).eq("clothes");  
    });  
  });



  describe("update Todo List", function () {
    it("Should update todo lists", async function () {
      const { todolist } = await loadFixture(deployTodoList);
      await todolist.createTodos("dirty", "clothes");

      await todolist.updateTodos(0, "clean", "clothes");
      const tododo = await todolist.todos(0);
      // const todos = await todolist.getTodos();      
      
      expect(tododo.Title).to.equal("clean"); 
      expect(tododo.description).to.equal("clothes");
      // expect(todos[2]).to.deep.equal("clothes");     
    });  
  });

  describe("delete Todos", function () {
    it("Should delete todo lists", async function () {
      const { todolist } = await loadFixture(deployTodoList);
      await todolist.createTodos("dirty", "clothes");

      await todolist.deleteTodos(0);
      const tododo = await todolist.todos(0);
      // const todos = await todolist.getTodos();      
      
      expect(tododo.Title).to.equal(""); 
      expect(tododo.description).to.equal(""); 
      // expect(todos[2]).to.deep.equal("clothes");     
    });  
  });

  describe("toggle Todos", function () {
    it("Should toggle todo lists", async function () {
      const { todolist } = await loadFixture(deployTodoList);
      await todolist.createTodos("dirty", "clothes");

      await todolist.toggleTodos(0);
      const tododo = await todolist.todos(0);
      const tx = tododo[2];
      // const todos = await todolist.getTodos();    
      expect(tx).to.equal(true);
          
    });  
  });
});
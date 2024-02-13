//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TodoList {
//struct with the todo list
    struct Todo {
        string Title;
        string description;
        bool completed;
    }
//array of structs
    Todo[] todos;

//add items to the array
    function createTodos(string memory _title, string memory _description) public {
        Todo memory todo;
        todo.Title = _title;
        todo.description = _description;
        todos.push(todo);    
    }

//returns the array of structs
    function getTodos() public view returns(Todo[] memory) {
        return todos;
    }

//false to true
    function toggleTodos(uint _index) external {
        todos[_index].completed = !todos[_index].completed;        
    }
    
   //updates the structs 
    function updateTodos(uint _index, string memory _title, string memory _description) external {
        todos[_index].Title = _title;
        todos[_index].description = _description;
    }

    //deletes a struct from the array
    function deleteTodos(uint _index) external {
        delete todos[_index];
    }

}

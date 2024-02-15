// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 

contract myToken { 

    //mappings
    mapping (address => uint256) public accounts;
    mapping(address => mapping(address => uint256)) allowances;

    //public variables;
   uint256 public TotalSupply;
   string public Name;
   string public symbol;
   uint8 public decimals;
   address public owner;

    //initialize the token
   constructor() {
    TotalSupply = 5000;
    Name = "Zarah";
    symbol ="ZEE";
    decimals = 18;    
    owner = msg.sender;
    accounts[owner] = TotalSupply;
   }


//checks the balance of any account
function balanceOf (address _who) external view returns(uint256) {
    require(_who != address(0), "invalid address");
    return accounts[_who];
}


//approves user to send on behalf of the token owner
event Approval( address indexed spender, uint256 amount);
function approve(address _spender, uint256 amount) external returns (bool) {
    require(_spender != address(0));
    allowances[msg.sender][_spender] = amount;
    emit Approval(_spender, amount);
    return true;
}


//send tokens from one person to another
event Transfer (address indexed _to, uint256 _value);
function transfer(address _to, uint _value) external {
    uint burnAmount = (_value * 10) / 100;
    require(_to != address(0));    
    require(accounts[msg.sender] > _value, "Insufficient token");
    accounts[msg.sender] -= _value;
    accounts[msg.sender] -= burnAmount;
    accounts[_to] += _value;
    TotalSupply -= burnAmount;
    emit Transfer(_to, _value);
}

//Transfer allocated balance from one user to another
event Transfer(address indexed _from, address indexed _to, uint256 amount);
function transferFrom (address _from, address _to, uint256 _value) external {
    uint burnAmount = (_value * 10) / 100;
    require (_to != address(0));
    require (accounts[_from] > _value);
    require(allowances[_from][msg.sender] >= _value);    
    accounts[_from] = accounts[_from] - _value; 
    accounts[_from] = accounts[_from] - burnAmount;     
    accounts[_to] = accounts[_to] + _value;
    allowances[_from][msg.sender] = allowances[_from][msg.sender] - _value;
    TotalSupply -= burnAmount;    
    emit Transfer(_from, _to, _value);    
}

//check the allowance
function allowance(address _owner, address spender) external view returns(uint256) {
    return allowances[_owner][spender];
}
}
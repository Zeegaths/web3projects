# Sample Hardhat Project
This projecst creates an ERC token, uses an interface for interaction and tests the implementation using hardhat.

To setup the hardhat environment run this in your project folder: 

```sol
npm init --y
npm install --save-dev hardhat 
npx hardhat init
```

To compile: 
```sol
npx hardhat compile
``` 

To deploy(I used the local environment).Use the correct file name
```sol
npx hardhat run scripts/deploy.ts - local environment
npx hardhat run --network sepolia - testnet
``` 

and finally test: 
```sol
npx hardhat test 
``` 




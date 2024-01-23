# Pizza Order (Ethereum Pet Project: Web3 Application)

---

## Description

---

The primary objective of this pet project is practising and getting hands-on experience with the fundamental 
functionalities of a Web 3.0 Blockchain application. The project is built using React.js and focuses on mastering 
the basics of Web3 technology, including wallet connection, blockchain transactions, smart contracts, and connecting a frontend 
to the blockchain.

The project is organized into two main workspaces:

- **client**: This workspace contains the client side of the application. It is built with Vite and React.js for the user interface, with interactions with the Ethereum blockchain handled by ethers.js.

- **smart_contract**: This workspace has a Hardhat development environment set up for writing, testing, and deploying Ethereum smart contracts. The contracts themselves are written in Solidity.

## Key Technologies

- **ethers.js**: A library for interacting with the Ethereum Blockchain and its ecosystem. It provides an easy-to-use interface for carrying out transactions, calling smart contracts, and more.

- **Hardhat**: A development environment for Ethereum software that comprises a testing environment, debugging tools, smart contract compilation, and more.

- **Smart Contracts**: Programs that run on the Ethereum blockchain. They are autonomous scripts which automatically execute predefined instructions when certain conditions are met.

- **OpenZeppelin**: A library for secure smart contract development for Ethereum and other EVM and eWASM blockchains. It provides tested, community-reviewed code for a variety of standard contracts and tokens.

## Running the Application

---

To interact with the application, you need the following prerequisites:

- **MetaMask**: This is an Ethereum Wallet which is used as a browser extension. It allows users to store Ether and other ERC-20 assets, and also interact with Ethereum enabled websites.

- **Ether (ETH)**: You need a certain amount of Ether (ETH) in your MetaMask wallet. Make sure your wallet is configured for the Sepolia test network. You can obtain Ether for testing from the Alchemy Sepolia faucet or INFURA Sepolia faucet.

---

- First, navigate to the application's root folder in the terminal and run the following command to install all necessary dependencies: `yarn install`.  
- Next, change into the packages directory: `cd packages`.  
- Then into the client directory: `cd client`.
- Finally, start the application by running: `yarn run dev`.  
- After running this command, the application should automatically start and open in your default web browser on **port 3000**.

Open an application on GitHub pages: <https://vderunov.github.io/pizza_order_web3/>
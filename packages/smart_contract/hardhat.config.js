require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.23",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/ZRKs5hQwL4HkUTCgW6R__ttWRCVnQb63",
      accounts: [""],
    },
  },
};

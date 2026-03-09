require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.13",

  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:7545',
      port: 7545,
      accounts: ['0x4d17151920eef59cd31dd1f7a8ae8e62705b2529fb5248f187bb8bb97a7c7bc5'],
    },
   
  },
};

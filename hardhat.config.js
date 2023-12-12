/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-ethers')

const MYGANACHE_PRIVATE_KEY =
  '0x07a7e4b73d0e3c93764db1ad03a4cc1eb3961427290f3fc12e338ed13459f622'

module.exports = {
  solidity: '0.8.19',

  networks: {
    ganache: {
      url: `HTTP://127.0.0.1:7545`,
      accounts: [`${MYGANACHE_PRIVATE_KEY}`],
    },
  },
}

//npx hardhat run --network sepolia scripts/deploy.js

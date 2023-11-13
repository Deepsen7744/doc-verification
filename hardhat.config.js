/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-ethers')

const MYGANACHE_PRIVATE_KEY =
  '0xf48a4d33fb82fc419fac58a218986455ac53b86d540ae1ab5bf328fe7a6502d4'

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

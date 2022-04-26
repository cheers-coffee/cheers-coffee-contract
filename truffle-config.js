require('dotenv').config();
const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = new Web3();

const getEnv = env => {
  const value = process.env[env];

  if (typeof value === 'undefined') {
    throw new Error(`${env} has not been set.`);
  }

  return value;
};

const mnemonic = getEnv('ETH_WALLET_MNEMONIC');
const liveNetwork = getEnv('ETH_LIVE_NETWORK');
const liveNetworkId = parseInt(getEnv('ETH_LIVE_NETWORK_ID'));

module.exports = {
  // Object with configuration for each network
  networks: {
    //development
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 5777,
      gas: 6721975
    },
    live: {
      provider: () => new HDWalletProvider(mnemonic, liveNetwork),
      network_id: liveNetworkId,
      gasPrice: web3.utils.toWei('80', 'gwei')
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
};

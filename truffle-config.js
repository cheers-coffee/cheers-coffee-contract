require('dotenv').config();
const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = new Web3();

const getEnv = (env, _default) => {
  const value = process.env[env];

  if (typeof value === 'undefined') {
    if (_default !== undefined) {
      return _default;
    }

    throw new Error(`${env} has not been set.`);
  }

  return value;
};

const mnemonic = getEnv('ETH_WALLET_MNEMONIC');
const liveNetwork = getEnv('ETH_LIVE_NETWORK');
const liveNetworkId = parseInt(getEnv('ETH_LIVE_NETWORK_ID', 1));
const liveGasPrice = parseInt(getEnv('ETH_LIVE_GAS_PRICE', web3.utils.toWei('40', 'gwei')));

const ropstenNetwork = getEnv('ETH_ROPSTEN_NETWORK');
const ropstenNetworkId = parseInt(getEnv('ETH_ROPSTEN_NETWORK_ID', 3));
const ropstenGasPrice = parseInt(getEnv('ETH_ROPSTEN_GAS_PRICE', web3.utils.toWei('10', 'gwei')));

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
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, ropstenNetwork),
      network_id: ropstenNetworkId,
      gasPrice: ropstenGasPrice,
    },
    live: {
      provider: () => new HDWalletProvider(mnemonic, liveNetwork),
      network_id: liveNetworkId,
      gasPrice: liveGasPrice,
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
      },
    },
  },
};

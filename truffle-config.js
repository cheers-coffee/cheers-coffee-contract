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
    },
    compilers: {
      solc: {
        version: "^0.8.0",
      },
    },
};

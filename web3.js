const Web3 = require('web3');

const connectionString = process.env.ETHEREUM_CONNECTION_STRING || '172.17.0.1:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(connectionString));

module.exports = { web3 };

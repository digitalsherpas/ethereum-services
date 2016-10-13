const Web3 = require('web3');
const config = require('./config');

const connectionString = config.ETHEREUM_CONNECTION_STRING || 'http://localhost:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(connectionString));

module.exports = { web3 };

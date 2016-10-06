const Promise = require('bluebird');
const contractHelper = require('../contracts/contractHelpers.js');
const web3Connection = require('../web3.js');
const loggers = require('../loggers/events.js');
const keys = require('../keys.js');

const hostWalletAddress = keys.ETH_HOST_WALLET;

const web3 = web3Connection.web3;

const createSvc = {
  createContract: req => new Promise((fulfill, reject) => {
    const senderAddress = req.body.senderAddress || web3.eth.accounts[0];
    const price = req.body.ticketPrice;
    const eventName = req.body.eventName;
    const quota = req.body.quota;
    const startDateTime = new Date(req.body.startDateTime).getTime();
    const endDateTime = new Date(req.body.endDateTime).getTime();
    const createDateTime = (new Date()).getTime();
    const description = req.body.description;
    const addressLine1 = req.body.addressLine1;
    const addressLine2 = req.body.addressLine2;
    const city = req.body.city;
    const state = req.body.state;
    const zipPostalCode = req.body.zipPostalCode;
    const country = req.body.country;
    const image = req.body.image;
    const eventContractInstance = web3.eth.contract(contractHelper.contractObj).new(senderAddress, eventName, price, quota, createDateTime, startDateTime, endDateTime, description, addressLine1, addressLine2, city, state, zipPostalCode, country, image, {
      data: contractHelper.bytecode,
      gas: 2000000,
      // gasPrice: 500000,
      from: hostWalletAddress,
    }, (err, contract) => {
      if (!err) {
        // NOTE: The callback will fire twice!
        // Once the contract has the transactionHash property set and once its deployed on an address
        // e.g. check tx hash on the first call (transaction send)
        if (!contract.address) {
          // console.log(contract.transactionHash) // The hash of the transaction, which deploys the contract
          // check address on the second call (contract deployed)
        } else {
          loggers(eventContractInstance).CreateEvent();
          fulfill({
            contractAddress: contract.address,
            eventName: eventName,
            createDateTime: createDateTime,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            description: description,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            zipPostalCode: zipPostalCode,
            country: country,
            image: image,
            price: price,
            quota: quota,
          });
          // res.send('Contract address is: ' + contract.address);
        }
      } else {
        console.log(err);
        reject(err);
      }
    });
  }),
};

module.exports = createSvc;

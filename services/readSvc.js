const contractHelper = require('../contracts/contractHelpers.js');
const web3Connection = require('../web3.js');

const web3 = web3Connection.web3;

const readSvc = {
  readEvent: (eventContractAddress) => {
    console.log('in read service');
    const eventContractInstance = web3.eth.contract(contractHelper.contractObj).at(eventContractAddress);
    const eventObj = {
      organizer: eventContractInstance.organizer().toString(),
      numAttendees: eventContractInstance.numAttendees().toString(),
      attendeesPaid: eventContractInstance.attendeesPaid().toString(), // TODO: Parse this mapping variable correctly
      quota: eventContractInstance.quota().toString(),
      price: eventContractInstance.price().toString(),
      eventName: eventContractInstance.eventName().toString(),
      eventCreateDateTime: new Date(parseInt(eventContractInstance.eventCreateDateTime().toString(), 10)),
      eventStartDateTime: new Date(parseInt(eventContractInstance.eventStartDateTime().toString(), 10)),
      eventEndDateTime: new Date(parseInt(eventContractInstance.eventEndDateTime().toString(), 10)),
      eventContractAddress: eventContractAddress.toString(),
    };
    console.log('in read svc, done reading contract');
    return eventObj;
  },
};

module.exports = readSvc;

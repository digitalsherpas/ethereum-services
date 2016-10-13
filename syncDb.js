const rp = require('request-promise');
const config = require('./config.js');
const readSvc = require('./services/readSvc.js');

module.exports = () => {
  rp({
    url: `${config.DB_SERVER_URL}:${config.DB_SERVER_PORT}/db/getAllEvents`,
  }).then((events) => {
    const parsedEvents = JSON.parse(events);
    const resultArray = parsedEvents.map(event => readSvc.readEvent(event.eventContractAddress));
    resultArray.forEach((event) => {
      rp({
        method: 'POST',
        url: `${config.DB_SERVER_URL}:${config.DB_SERVER_PORT}/db/updateEvent`,
        body: event,
        json: true,
      });
    });
  }).catch((err) => {
    console.log('Error:', err);
  });
  console.log('Cron job complete.');
};

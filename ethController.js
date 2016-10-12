const createSvc = require('./services/createSvc');
const buySvc = require('./services/buySvc');
const verifySvc = require('./services/verifySvc');
const readSvc = require('./services/readSvc');
const rp = require('request-promise');
const config = require('./config.js');

const controller = {
  createEvent: (req, res) => {
    return new Promise((fulfill, reject) => {
      createSvc.createContract(req).then((returnObj) => {
        rp({
          method: 'POST',
          url: `${process.env.DB_SERVER_URL || config.SERVER_URL}:${config.DB_SERVER_PORT}/db/createEvent`,
          body: returnObj,
          json: true,
        }).then((event) => {
          fulfill(event);
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
      });
    });
  },
  buyTicket: (req, res) => {
    buySvc.buyTicket(req, res);
  },
  getNumAttendees: (req, res) => {
    verifySvc.getNumAttendees(req, res);
  },
  verifyAttendee: (req, res) => {
    verifySvc.verifyAttendee(req, res);
  },
  findEvent: (req, res) => {
    rp({
      method: 'GET',
      url: `${process.env.DB_SERVER_URL || config.SERVER_URL}:${config.DB_SERVER_PORT}/db/findEvent`,
      qs: { eventName: req.query.eventName },
      json: true,
    })
    .then((event) => {
      const eventObj = readSvc.readEvent(event.eventContractAddress);
      res.status(200).send(event);
    }).catch((err) => {
      res.status(500).send(err);
    });
  },
  getEventsFromDB: (req, res) => {
    rp({
      url: `${process.env.DB_SERVER_URL || config.SERVER_URL}:${config.DB_SERVER_PORT}/db/getAllEvents`,
      qs: {
        eventName: req.query.eventName,
      },
    })
    .then((events) => {
      res.status(200).send(events);
    }).catch((err) => {
      res.status(500).send(err);
    })
  },
  getHostEventsFromDB: (req, res) => {
    rp({
      url: `${process.env.DB_SERVER_URL || config.SERVER_URL}:${config.DB_SERVER_PORT}/db/getAllHostEvents`,
      qs: {
        hostName: req.query.hostName,
      },
    })
    .then((events) => {
      res.status(200).send(events);
    }).catch((err) => {
      res.status(500).send(err);
    })
  },
  getEventsFromBlockchain: (req, res) => {
    rp({
      url: `${config.SERVER_URL}:${config.DB_SERVER_PORT}/db/getAllEvents`
    })
    .then((events) => {
      const parsedEvents = JSON.parse(events);
      const resultArray = parsedEvents.map((event) => {
        return readSvc.readEvent(event.contractAddress);
      });
      res.status(200).send(resultArray);
    }).catch((err) => {
      res.status(500).send(err);
    });
  },
};

module.exports = controller;

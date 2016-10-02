const createSvc = require('./services/createSvc');
const buySvc = require('./services/buySvc');
const verifySvc = require('./services/verifySvc');
const readSvc = require('./services/readSvc');
const rp = require('request-promise');
const config = require('./config.js');

const controller = {
  createEvent: (req, res) => {
    createSvc.createContract(req).then((returnObj) => {
      rp({
        method: 'POST',
        url: `${config.SERVER_URL}:${config.DB_SERVER_PORT}/db/createEvent`,
        body: returnObj,
        json: true
      }).then(() => {
        res.sendStatus(200);
      }).catch((err) => {
        res.status(500).send(err);
      })
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
      url: `${config.SERVER_URL}:${config.DB_SERVER_PORT}/db/findEvent`,
      qs: req.params,
      json: true,
    })
    .then((event) => {
      const eventObj = readSvc.readEvent(event.contractAddress);
      res.status(200).send(obj);
    }).catch((err) => {
      res.status(500).send(err);
    });
    },
  getAllEvents: (req, res) => {
    rp({
      url: `${config.SERVER_URL}:${config.DB_SERVER_PORT}/db/getAllEvents`
    })
    .then((events) => {
      const resultArray = events.map(event => readSvc.readEvent(event.contractAddress));
      res.status(200).send(resultArray);
    }).catch((err) => {
      res.status(500).send(err);
    });
    },
  };

module.exports = controller;

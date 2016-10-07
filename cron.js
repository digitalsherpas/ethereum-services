const cron = require('node-cron');
const syncDb = require('./syncDb.js');

cron.schedule('* * * * *', () => {
  syncDb();
});

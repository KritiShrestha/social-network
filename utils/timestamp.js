//  // Create a new Date object representing the current timestamp
//  const timestamp = new Date();

// // Format the timestamp using the Date object's methods
// const formattedTimestamp = `${timestamp.getFullYear()}-${timestamp.getMonth() + 1}-${timestamp.getDate()} ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;

// console.log(formattedTimestamp); 

const moment = require('moment');

function getFormattedTimestamp() {
  const timestamp = moment();
  return timestamp.format('YYYY-MM-DD HH:mm:ss');
}

module.exports = { getFormattedTimestamp };

var moment = require('moment');

var date = moment();
//moment().add(7, 'days');

date.add(7, 'days').add(11, 'months'); 
console.log(date.format('MMMM Do YYYY, h:mm:ss a'));

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
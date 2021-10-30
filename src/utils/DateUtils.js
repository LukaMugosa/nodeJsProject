const moment = require('moment');
module.exports = {
	differenceInMonths(fromDate, toDate) {
		return moment(new Date(fromDate)).diff(new Date(toDate), 'months', true);
	}
}
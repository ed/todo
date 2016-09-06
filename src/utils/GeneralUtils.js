let moment = require('moment')


module.exports = {
	agenda: function () {
		let startOfWeek = moment().startOf('week');
		let endOfWeek = moment().endOf('week');
		let days = [];
		let day = startOfWeek;
		while (day <= endOfWeek) {
			days.push(day.format('DD MMMM Y'));
			day = day.clone().add(1, 'd');
		}
		return days;
	},

	hyphenate: function (i) {
		return i.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}
}
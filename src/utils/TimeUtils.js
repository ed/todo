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

	createTimeInterval: function() {
		let time = ["12:00am", "12:30am"]
		for (var i = 1 ; i < 12; i++) {
			time.push(i+":00am")
			time.push(i+":30am")
		}
		time.push("12:00pm")
		time.push("12:30pm")
		for (var i = 1 ; i < 12; i++) {
			time.push(i+":00pm")
			time.push(i+":30pm")
		}
		return time;
	},

	getMonth(mo) {
		const start = mo.startOf('month');
		let day = start.clone();
		const end = mo.endOf('month');
		let month = []
		day = day.startOf('week');
		month.push(day.clone());
		while(day.dayOfYear() != end.endOf('week').dayOfYear()) {
			month.push(day.clone());
			day = day.add(1, 'day');
		}
		month.push(end.endOf('week'));
		return month;
	}


}

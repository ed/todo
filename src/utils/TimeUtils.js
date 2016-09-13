let moment = require('moment')

module.exports = {


  tttf(t) {
    return moment(t, ['h:mm A']).format('HH:mm');
  },

	agenda: function () {
		let startOfWeek = moment().startOf('week');
		let endOfWeek = moment().endOf('week');
		let days = [];
		let day = startOfWeek;
		while (day <= endOfWeek) {
			days.push(day.format('MM-DD-YY'));
			day = day.clone().add(1, 'd');
		}
		return days;
	},

	createTimeInterval: function() {
		let time = ['',"12:00am", "12:30am"]
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
		while(day.dayOfYear() != end.endOf('week').dayOfYear()) {
			month.push(day.clone());
			day = day.add(1, 'day');
		}
		month.push(end.endOf('week'));
		return month;
	}


}

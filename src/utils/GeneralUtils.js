module.exports = {
	hyphenate: function (i) {
		return i.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	},

	createEdits: function() {
		let arr = [];
		let s = {
			tags: '',
			prio: '',
			users: '',
			sub: ''
		}
		for (var i in s) {
			let ih = module.exports.hyphenate(i)
			let obj = {
				cname: "todo-" + ih + "-setter",
				def: "set " + ih,
				val: i,
			}
			arr.push(obj);
		}
		return arr;
	}
}

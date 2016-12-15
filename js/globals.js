var datas = {
	templatesUrl: {
		msg: "templates/message.html"
	}
};

var globalFn = {
	templateParser: function (skin, obj) {
		$.each(obj, function (id, value) {
			 skin = skin.replace(new RegExp('{' + id + '}', 'g'), value);
		});

		return skin;
	},
	getUrl: function (url, cb) {
		$.ajax({
			url: url,
			type: 'GET',
			success: function(res) {
				cb(res);
			}
		});
	},
	objLength: function (obj) {
		var count = 0;
		$.each(obj, function () {
			count++;
		});

		return count;
	},
	formatDate: function (date) {
		var addZero = function(i) {
		    if (i < 10) {
		        i = "0" + i;
		    }
		    return i;
		};

		var dayString = [
				addZero(date.getMonth() + 1),
				addZero(date.getDate()),
				date.getFullYear(),
			].join("/"),
			hourString = [
				addZero(date.getHours()),
				addZero(date.getMinutes()),
			].join(":");

		return " the " + dayString + " at " + hourString;
	}
};
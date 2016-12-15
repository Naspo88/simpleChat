var datas = {
	templatesUrl: {
		msg: "templates/message.html"
	}
};

var botAnswers = {
	0: {
		userTxt: "init",
		message: "Welcome to this simple chat.\nYou can send your message pressing ENTER or the SUBMIT buttton.\nIf you need a new line for your message you have to press SHIFT + ENTER.\nI create a little bot that can simulate me on this conversation answering some of your questions! Hope you will enjoy it.\nRoberto"
	}
};

var globalFn = {
	templateParser: function (skin, obj) {
		$.each(obj, function (id, value) {
			 skin = skin.replace(new RegExp('{' + id + '}', 'g'), value);
		});

		return skin;
	},
	formatText: function (txt) {
		return txt.replace(/(?:\r\n|\r|\n)/g, "<br/>");
	},
	getBotMessage: function (txt) {
		var result = "";

		$.each(botAnswers, function (id, val) {
			if (val.userTxt == txt) {
				result = val.message;
				return false;
			}
		});

		return result;
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
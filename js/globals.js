var datas = {
	templatesUrl: {
		msg: "templates/message.html"
	}
};

var botAnswers = {
	0: {
		userTxt: ["init"],
		message: "Welcome to this simple chat.\nYou can send your message pressing ENTER or the SUBMIT buttton.\nIf you need a new line for your message you have to press SHIFT + ENTER.\nI created a little bot that can simulate me on this conversation answering some of your questions! Hope you will enjoy it.\nRoberto"
	},
	1: {
		userTxt: ["Hello", "Hello!", "Hi"],
		message: "Hello! Please to meet you!"
	},
	2: {
		userTxt: ["How are you?", "How's it going?", "How are you doing?"],
		message: "Really good thanks! What about you?"
	},
	3: {
		userTxt: ["What's new?", "What's up?", "What's going on?"],
		message: "Nothing new... trying to move to UK!"
	},
	4: {
		userTxt: ["Funny project", "I like this chat!"],
		message: "Thank you very much! You should hire me! :P"
	},
	5: {
		userTxt: ["test"],
		message: "It's working!\nNow try to test my bot with some question like:\n'Hello'\n'How are you?'\n'What’s new?'\n'Funny project'"
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
			for (var i = 0; i < val.userTxt.length; i++) {
				if (val.userTxt[i].toLowerCase() == txt.toLowerCase()) {
					result = val.message;
					return false;
				}
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
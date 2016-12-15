"use strict"
window.onload = function () {

	var pageElem = {},
		templates = {};

	// Initialize all page elements I could need in the project 
	var elemInit = function () {
		pageElem.body = $("body");

		pageElem.container = pageElem.body.find(".container");

		pageElem.form = pageElem.body.find("form");
		pageElem.textarea = pageElem.form.find("textarea");
		pageElem.input = pageElem.form.find("input[name=submit]");

	};

	// Download all templates I will use in the project
	var loadTemplates = function (callback) {
		var endCount = 0,
			data = datas.templatesUrl;

		$.each(data, function (id,val) {
			globalFn.getUrl(val, function (res) {
				endCount++;
				templates[id] = res;

				if (endCount == globalFn.objLength(data))
					callback();
			});
		});
	};

	// Manage the new message to chat
	var sendMessage = function (text, bot) {
		if (!text) {
			alert("You have to write something to send a message");
		} else {
			var newd = new Date(),
				template = templates.msg,
				data = {
					type: (!bot) ? "mine" : "bot",
					user: (!bot) ? "Me" : "Roberto Minghi",
					txt: globalFn.formatText(text),
					when: globalFn.formatDate(newd)
				};

			template = globalFn.templateParser(template, data);

			pageElem.container.append(template);

			pageElem.textarea.val("");

			checkBot(text);
		}
	};

	// Check if there is a standard message from the bot and print it if yes
	var checkBot = function (txt) {
		var botTxt = globalFn.getBotMessage(txt);

		if (botTxt) {
			sendMessage(botTxt, true);
		}
	};

	// Manager of the page init after preparation
	var init = function () {
		elemInit();

		pageElem.input.click(function () {
			var text = pageElem.textarea.val();
			sendMessage(text, false);
		});

		pageElem.textarea.keypress(function (e) {
			if (e.which == 13) {
				if (!e.shiftKey) {
					e.preventDefault();
					var text = pageElem.textarea.val();
					sendMessage(text, false);
				}
			}
		});

		checkBot("init");

	};
	/* End functions */

	/* Flow on load */
	loadTemplates(init);
	/* End flow on load*/
}
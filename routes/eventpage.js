var data = require('../data.json');
var currentEvent;
exports.view = function(req, res){
	if (typeof req.query.name != 'undefined'){
		var serverUrl = 'https://api.parse.com/1/files/' + req.query.image;
		console.log("submitting new idea");
		console.log("image:");
		console.log(req.query.image);
		var imageURL = "images/cropped-gift-box.png";
		if(req.query.image != ''){
			imageURL = req.query.image;
		}
		var arr = req.query.name.split(" ");
		var compName;
		for (i in arr){
			compName += arr[i];
		}
		var newIdea = {
					"eventid": currentEvent,
					"name": req.query.name,
					"compName": compName,
					"price": req.query.price,
					"description": req.query.description,
					"image": imageURL,
					"bought": "false",
					"vote": "0",
					"voteDir": ""
		};
		console.log(newIdea);
		var code = currentEvent;
		var e = data[code];
		console.log(code);
		console.log(e);
		console.log(e.idea);
		e.idea.push(newIdea);
		var idealist = e.idea;
		idealist = sort(idealist);
		data[code].idea = idealist;

		res.render('eventpage', e);
	}
	else if(typeof req.query.newevent != 'undefined'){
		console.log("creating new event");
		var id = req.query.newevent.split('+')[0];
		var title = req.query.newevent.split('+')[1];
		var date = req.query.newevent.split('+')[2];
		var description = req.query.newevent.split('+')[3];
		var newevent = {
			"id": id,
			"title": title,
			"date": date,
			"description": description,
			"idea" : []
		}
		currentEvent = id;
		data[id] = newevent;
		res.render('eventpage', data[id]);
	}
	else if (typeof req.query.upvote != 'undefined'){
		var params = req.query.upvote.split('+');
		var eventCode = params[0];
		if (params.length > 1){
			var ideaVoted = params[1];
			console.log("ideaVoted");
			console.log(ideaVoted);
			var voteTally = parseInt(params[2]);
			var e = data[eventCode];
			var idealist = e.idea;
			for (i in idealist){
				var idea = idealist[i];
				if (idea.name == ideaVoted){
					idea.vote = voteTally+1;
					idea.voteDir="up";
				}
			}
			idealist = sort(idealist);
			console.log(idealist);
			data[eventCode].idea = idealist;
		}
		res.render('eventpage', data[eventCode]);
	}
	else if (typeof req.query.downvote != 'undefined'){
		var params = req.query.downvote.split('+');
		var eventCode = params[0];
		if (params.length > 1){
			var ideaVoted = params[1];
			var voteTally = parseInt(params[2]);
			var e = data[eventCode];
			var idealist = e.idea;
			for (i in idealist){
				var idea = idealist[i];
				if (idea.name == ideaVoted){
					idea.vote = voteTally-1;
					idea.voteDir="down";
				}
			}
			idealist = sort(idealist);
			data[eventCode].idea = idealist;
		}
		res.render('eventpage', data[eventCode]);
	}
	else if(req.query.eventcode.length > 0){
		var params = req.query.eventcode.split('+');
		console.log(params);
		var code = params[0];
		console.log(params);
		if (params.length > 1){
			var ideaBought = params[1];
			var e = data[code];
			var idealist = e.idea;
			for (i in idealist){
				var idea = idealist[i];
				if (idea.name == ideaBought){
					console.log("idea bought!");
					console.log(idea.name);
					idea.bought = "true";
				}
			}
		}
		console.log(data);
		console.log(code);
		console.log(data[code]);
		currentEvent = code;
		var e = data[code];
		var idealist = e.idea;
		idealist = sort(idealist);
		data[code].idea = idealist;
		res.render('eventpage', data[code]);
	}
}

function sort(array) {
    return array.sort(function(a, b) {
    	console.log(a["vote"]);
        var x = a["vote"]; var y = b["vote"];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

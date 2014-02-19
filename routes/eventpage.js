var data = require('../data.json');
exports.view = function(req, res){
	if (typeof req.query.name != 'undefined'){
		console.log("submitting new idea");
		var newIdea = {
					"eventid": req.query.eventcode,
					"name": req.query.name,
					"price": req.query.price,
					"description": req.query.description,
					"image": "images/cropped-gift-box.png",
					"bought": "false"
		};
		console.log(newIdea);
		var code = req.query.eventcode;
		var e = data[code];
		console.log(e);
		console.log(e.idea);
		e.idea.push(newIdea);
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
		data[id] = newevent;
		res.render('eventpage', data[id]);
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
		res.render('eventpage', data[code]);
	}
}
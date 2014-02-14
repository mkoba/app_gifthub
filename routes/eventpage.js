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
	else if(req.query.eventcode.length > 0){
		console.log(data);
		var code = req.query.eventcode;
		console.log(code);
		console.log(data[code]);
		res.render('eventpage', data[code]);
	}
}
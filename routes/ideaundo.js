var data = require('../data.json');
exports.view = function(req, res){
//	console.log(data);
	console.log(req.query.bought);
	var eventid = req.query.bought.split('+')[0];
	var ideaname = req.query.bought.split('+')[1];

	console.log("eventid: " + eventid);
	console.log("ideaname: " + ideaname);
	var e = data[eventid];
	var idealist = e.idea;
	console.log(idealist);
	for (i in idealist){
		console.log(idealist[i]);
		var idea = idealist[i];
		console.log(idea.name == ideaname);
		if (idea.name == ideaname){
			idea.bought = "true";
			res.render('ideaundo', idea);
			break;
		}
	}
			console.log("HERE");
};

function undoBuy(eventid, ideaname){
	var e = data[eventid];
	var idealist = e.idea;
	console.log(idealist);
	for (i in idealist){
		console.log(idealist[i]);
		var idea = idealist[i];
		console.log(idea.name == ideaname);
		if (idea.name == ideaname){
			idea.bought = "false";
			break;
		}
	}
	console.log(data[eventid].idea.bought);
}
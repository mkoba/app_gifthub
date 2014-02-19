var data = require('../data.json');
exports.view = function(req, res){
//	console.log(data);
	console.log(req.query.selected);
	var eventid = req.query.selected.split('+')[0];
	var ideaname = req.query.selected.split('+')[1];
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
			idea.bought = "false"
			res.render('idea', idea);
			break;
		}
	}
			console.log("HERE");
};
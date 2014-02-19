 exports.view = function(req, res){
//	console.log(data);
	var newEvent = {
					"id": "xM3eT4",
					"title": req.query.title,
					"date": req.query.date,
					"description": req.query.description}
	console.log(newEvent);
	res.render('eventcreated', newEvent);
};
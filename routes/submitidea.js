var data = require('../data.json');
exports.view = function(req, res){
//	console.log(data);
	var e = {"eventid" : req.query.submitidea};
	console.log(e);
	res.render('submitidea', e);
}
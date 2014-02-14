var data = require('../data.json');
exports.view = function(req, res){
	console.log(data);
	var code = req.query.eventcode;
	console.log(code);
	console.log(data[code]);
	res.render('eventpage', data[code]);
}
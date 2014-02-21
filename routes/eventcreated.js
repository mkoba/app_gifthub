 exports.view = function(req, res){
//	console.log(data);
	var id = makeid();
	var newEvent =  {"id": id,
					"title": req.query.title,
					"date": req.query.date,
					"description": req.query.description};
	console.log(newEvent);
	res.render('eventcreated', newEvent);
};

function makeid()
{
    var text = "";
    var possible = "0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
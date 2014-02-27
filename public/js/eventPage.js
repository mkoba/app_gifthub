var count = 0; //for debugging ignore
var boughtCount = 0;
var bought = new Array();
var upVoteCount = 0;
var upvote = new Array();
var downVoteCount = 0;
var downvote = new Array();

// called when page is loaded (i believe)
$(document).ready(function() {
	initializePage();
	for (i in upvote){
		$.modifyVoteUp(upvote[i]);
	}
	for (i in downvote){
		$.modifyVoteDown(downvote[i]);
	}
	for (i in bought){
		$.markBought(bought[i]);
	}
});

/*
 * Function that is called when the document is ready.
 */

// function to initialize the page
function initializePage() {
	console.log(count);
	count = count + 1;

	//gets an array of img elements (elements that use the tag <img...>)
	var image = $(".eventpageimage");
	console.log(image);
	console.log(image.length);
	// for each image call the modify bought method
	$.each(image, modifyBought);
}

function markBought(arr){
	var imageid = arr[0];
	var buttonid = arr[1];
	document.getElementById(imageid).className = "imagebought";	
	document.getElementById(buttonid).className = "ideaBoughtButton";
	$("#" + buttonid).attr('data-target', '#'+name+'_bought_modal');
}

// function to modify the appearance based on data which i pass by names of elements
function modifyBought(e){
	event.preventDefault();
	//finds the image id so that i know if the item has been bought
	//image id should be {{bought}}_{{name}}_image
	//console.log($(this).closest('.idea').attr('id'));
	var imageid = $(this).attr('id');
	if(typeof imageid != 'undefined'){
		console.log(imageid);

		//get the {{bought}} value
		var bought = imageid.split('_')[1];
		var name = imageid.split('_')[0];

		// check if bought
		if (bought == "true"){
			// set image class to imagebought so that it's greyed out and faded
			document.getElementById(imageid).className = "imagebought";	

			// set the class of the button with the ideas name to ideaBoughtButton
			// which is grey
			var label = name+"_label";
			document.getElementById(label).className = "ideaBoughtLabel";

			// sets the destination of the form so that it goes to ideabought
			// instead of idea
			var buttonid = $(this).arr('id');
			$("#" + buttonid).attr('data-target', '#'+name+'_bought_modal');
			//document.getElementById(formid).action = "/ideabought";
		}
	}
}

function modifyVoteUp(buttonid){
	event.preventDefault();		
	console.log("MODIFY VOTE UP");
	if(typeof buttonid != 'undefined'){
		console.log(buttonid);
		var form = document.getElementById(buttonid).parentElement.innerHTML;
		var form_beg = form.split("</button>");
		console.log(form_beg);
		var vote = parseInt(form_beg[1].split(">")[1]) + 1;
		console.log(form_beg[0] + '</button><p class="vote">' + vote + "</p><" + form_beg[1].split("<")[3] + "</button>");
		document.getElementById(buttonid).parentElement.innerHTML = form_beg[0] + '</button><p class="vote">' + vote + "</p><" + form_beg[1].split("<")[3] + "</button>";
		document.getElementById(buttonid).className = "ideaUpvotedButton";
		document.getElementById(buttonid).onclick=function(){ undoVoteUp(buttonid); };
		console.log(document.getElementById(buttonid).parentElement.children);
		buttonid = document.getElementById(buttonid).parentElement.children[2].id;
		document.getElementById(buttonid).disabled = true;
		buttonid = document.getElementById(buttonid).parentElement.children[0].id;
		console.log(buttonid);
		upvote[upVoteCount] = buttonid;
		upVoteCount++;
		console.log(upvote);
		document.getElementById("changes").value+="+up_"+buttonid.split('_')[0];
	}
}

function undoVoteUp(buttonid){
	event.preventDefault();		
	console.log("MODIFY VOTE UP");
	if(typeof buttonid != 'undefined'){
		console.log(buttonid);
		var form = document.getElementById(buttonid).parentElement.innerHTML;
		var form_beg = form.split("</button>");
		var vote = parseInt(form_beg[1].split(">")[1]) - 1;
		document.getElementById(buttonid).parentElement.innerHTML = form_beg[0] + '</button><p class="vote">' + vote + "</p><" + form_beg[1].split("<")[3] + "</button>";
		document.getElementById(buttonid).className = "upvoteButton";
		document.getElementById(buttonid).disabled = false;
		document.getElementById(buttonid).onclick=function(){ modifyVoteUp(buttonid); };
		buttonid = document.getElementById(buttonid).parentElement.children[2].id;
		console.log(buttonid);
		document.getElementById(buttonid).disabled = false;
		buttonid = document.getElementById(buttonid).parentElement.children[0].id;
		upvote.splice(upvote.indexOf(buttonid), 1);
		document.getElementById("changes").value-="+up_"+buttonid.split('_')[0];
	}
}

function modifyVoteDown(buttonid){
	event.preventDefault();		
	console.log("MODIFY VOTE DOWN");
	if(typeof buttonid != 'undefined'){
		console.log(buttonid);
		var form = document.getElementById(buttonid).parentElement.innerHTML;
		var form_beg = form.split("</button>");
		var vote = parseInt(form_beg[1].split(">")[1]) - 1;
		document.getElementById(buttonid).parentElement.innerHTML = form_beg[0] + '</button><p class="vote">' + vote + "</p><" + form_beg[1].split("<")[3] + "</button>";
		document.getElementById(buttonid).className = "ideaDownvotedButton";
		document.getElementById(buttonid).onclick=function(){ undoVoteDown(buttonid); };
		buttonid = document.getElementById(buttonid).parentElement.children[0].id;
		document.getElementById(buttonid).disabled = true;
		buttonid = document.getElementById(buttonid).parentElement.children[2].id;
		console.log(buttonid);
		downvote[downVoteCount] = buttonid;
		downVoteCount++;
		document.getElementById("changes").value+="+down_"+buttonid.split('_')[0];
	}
}

function undoVoteDown(buttonid){
	event.preventDefault();		
	console.log("MODIFY VOTE UP");
	if(typeof buttonid != 'undefined'){
		console.log(buttonid);
		var form = document.getElementById(buttonid).parentElement.innerHTML;
		var form_beg = form.split("</button>");
		var vote = parseInt(form_beg[1].split(">")[1]) + 1;
		document.getElementById(buttonid).parentElement.innerHTML = form_beg[0] + '</button><p class="vote">' + vote + "</p><" + form_beg[1].split("<")[3] + "</button>";
		document.getElementById(buttonid).className = "downvoteButton";
		document.getElementById(buttonid).disabled = false;
		document.getElementById(buttonid).onclick=function(){ modifyVoteDown(buttonid); };
		buttonid = document.getElementById(buttonid).parentElement.children[0].id;
		document.getElementById(buttonid).disabled = false;
		buttonid = document.getElementById(buttonid).parentElement.children[2].id;
		downvote.splice(downvote.indexOf(buttonid), 1);
		document.getElementById("changes").value-="+down_"+buttonid.split('_')[0];
	}
}

function claimClicked(buttonid, imageid, ideaid, modal){
	event.preventDefault();	
	document.getElementById(buttonid).innerHTML="undo";
	document.getElementById(buttonid).onclick=function() { undoClicked(this.id, imageid, ideaid, modal); };
	document.getElementById(buttonid).value="claimed";
	document.getElementById(ideaid).className = "imagebought";
	console.log(modal.split('_')[0]+"_label");
	document.getElementById(modal.split('_')[0]+"_label").className = "ideaBoughtLabel";	
	//document.getElementById(ideaid).className = "ideaBoughtButton";
	var bought = modal.split('_')[0] + '_bought_' + modal.split('_')[1];
	console.log(bought);
	console.log(ideaid);
	$("#" + ideaid).attr('data-target', '#'+ bought);
	bought[boughtCount] = new Array(imageid, ideaid);
	boughtCount++;
	document.getElementById("changes").value+="+bought_"+buttonid.split('_')[0];
}

function undoClicked(buttonid, imageid, ideaid, modal){
	event.preventDefault();	
	document.getElementById(buttonid).innerHTML="claim";
	document.getElementById(buttonid).onclick=function() { claimClicked(this.id, imageid, ideaid, modal); };
	document.getElementById(buttonid).value="";
	document.getElementById(imageid).className = "image";
	document.getElementById(ideaid).className = "submitButton";
	document.getElementById(modal.split('_')[0]+"_label").className = "ideaLabel";
	console.log("modal");
	console.log(modal);
	$("#" + ideaid).attr('data-target', '#'+ modal);
	var tmp = new Array(imageid, ideaid);
	bought.splice(bought.indexOf(tmp, 1));
	document.getElementById("changes").value-="+bought_"+buttonid.split('_')[0];
}
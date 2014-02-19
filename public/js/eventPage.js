$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$(".idea").each(function() {
		$(".idea").ready(modifyBought);
	});
}

function modifyBought(e){
	event.preventDefault();
	var imageid = $(this).find('.image').attr('id');
	var bought = imageid.split('_')[0];
	console.log(imageid);
	if (bought == "true"){
		document.getElementById(imageid).className = "imagebought";	
		var buttonid = $(this).find('.submitButton').attr('id');
		document.getElementById(buttonid).className = "ideaBoughtButton";
		document.getElementById(buttonid).disabled = true;
	}
}
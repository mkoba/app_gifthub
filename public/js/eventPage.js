var count = 0;
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log(count);
	count = count + 1;
	var image = $("img");
	$.each(image, modifyBought);
}

function modifyBought(e){
	event.preventDefault();
	console.log($(this).closest('.idea').attr('id'));
	var imageid = $(this).attr('id');
	console.log(imageid);
	var bought = imageid.split('_')[0];
	
	if (bought == "true"){
		document.getElementById(imageid).className = "imagebought";	
		var buttonid = $(this).closest('.idea').find('.submitButton').attr('id');
		document.getElementById(buttonid).className = "ideaBoughtButton";
		var formid = $(this).closest('.idea').find('.form').attr('id');
		document.getElementById(formid).action = "/ideabought";
	}
}
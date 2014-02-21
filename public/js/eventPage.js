var count = 0; //for debugging ignore

// called when page is loaded (i believe)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */

// function to initialize the page
function initializePage() {
	console.log(count);
	count = count + 1;

	//gets an array of img elements (elements that use the tag <img...>)
	var image = $("img");
	image = image.slice(1);
	console.log(image);
	// for each image call the modify bought method
	$.each(image, modifyBought);
}

// function to modify the appearance based on data which i pass by names of elements
function modifyBought(e){
	event.preventDefault();

	//finds the image id so that i know if the item has been bought
	//image id should be {{bought}}_{{name}}_image
	//console.log($(this).closest('.idea').attr('id'));
	var imageid = $(this).attr('id');
	console.log(imageid);

	//get the {{bought}} value
	var bought = imageid.split('_')[0];
	

	// check if bought
	if (bought == "true"){
		// set image class to imagebought so that it's greyed out and faded
		document.getElementById(imageid).className = "imagebought";	

		// set the class of the button with the ideas name to ideaBoughtButton
		// which is grey
		var buttonid = $(this).closest('.idea').find('.submitButton').attr('id');
		document.getElementById(buttonid).className = "ideaBoughtButton";

		// sets the destination of the form so that it goes to ideabought
		// instead of idea
		var formid = $(this).closest('.idea').find('.form').attr('id');
		document.getElementById(formid).action = "/ideabought";
	}
}
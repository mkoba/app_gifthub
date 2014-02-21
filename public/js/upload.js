$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  	$(".fileselected").ready(capture);
  	});
}

function capture(video, canvas, image, snapshotButton) {
  event.preventDefault();
	var constraints = {
		image: true
	}

	var successCallback = function(mediaStream) {
		var button = document.querySelector('button');
		button.addEventListener('click', function() {
			mediaStream.stop();
		}, false);
	};

	var errorCallback = function() {
		console.log('failure to get media');
	};

	navigator.getUserMedia(
		constraints,
		successCallback,
		errorCallback
	);

}
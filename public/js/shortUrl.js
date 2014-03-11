$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */

// function to initialize the page
function initializePage() {
	//gets an array of img elements (elements that use the tag <img...>)
	// for each image call the modify bought method
	shortenLink();
}


function shortenLink(){
	console.log($("input"));
	var long_url = $("input").attr('value');
	console.log("HI");
	console.log(long_url);
	makebitly(long_url, function(short_url) {
	    		console.log(short_url);
	    		document.getElementById("direct_link").value=short_url;
	    		document.getElementById("fbicon").href="http://www.facebook.com/sharer.php?u=" + short_url;
	    		document.getElementById("emailicon").href="mailto:?Subject=Simple Share Buttons&Body=I%20just%20created%20an%20event!%20Come%20help%20me%20with%20gift%20ideas!%20 " + short_url;
	    		document.getElementById("twittericon").href="http://twitter.com/share?url="+short_url+"&text=I just created an event! Come help me with gift ideas.";
	 			});
	function makebitly(original_url, func){
		var login = "o_46o2edlk92";
		var api_key = "R_ed1e00ca002c4639882e1d673f977948";
		$.getJSON(
	        "http://api.bitly.com/v3/shorten?callback=?", 
	        { 
	            "format": "json",
	            "apiKey": api_key,
	            "login": login,
	            "longUrl": original_url
	        },
	        function(response)
	        {
	            func(response.data.url);
	        }
	    );
	}
}
// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '435785755966-rus1t439cnro0968rj9bbkbbt7ltv0q8.apps.googleusercontent.com';

var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

/**
* Check if current user has authorized this application.
*/
function checkAuth() {
gapi.auth.authorize(
	{
		'client_id': CLIENT_ID,
		'scope': SCOPES.join(' '),
		'immediate': true
	}, handleAuthResult);
}

/**
* Handle response from authorization server.
*
* @param {Object} authResult Authorization result.
*/
 function handleAuthResult(authResult) {
	var authorizeDiv = document.getElementById('authorize-div');
	if (authResult && !authResult.error) {
		// Hide auth UI, then load client library.
		authorizeDiv.style.display = 'none';
		loadGmailApi();
	} else {
		// Show auth UI, allowing the user to initiate authorization by
		// clicking authorize button.
		authorizeDiv.style.display = 'inline';
	}
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
gapi.auth.authorize(
	{client_id: CLIENT_ID, scope: SCOPES, immediate: false},
	handleAuthResult);
return false;
}

/**
 * Load Gmail API client library. List labels once client library
 * is loaded.
 */
function loadGmailApi() {
	console.log("Test");
	gapi.client.load('gmail', 'v1', function() {
		console.log("Started");
		listThreads("me", function(resp) {
			for(var i = 0; i<5; i++){
				console.log("for loop iteration " + i);
				console.log(resp["threads"][i]["id"]);

				var list = []
				getThreads("me", resp["threads"][i]["id"], function(response){
					console.log("response:");
					console.log(response);
					list.push(response);

				});
			}
			
			for(var i=0; i<5; i++) {
				var temp = list[i].messages[0].payload.headers;
				$.each(temp, function (j, dataItem) {
					if (dataItem.name == "From") {
						console.log("FOUND IT:" + dataItem.value);
					}
				});
			}

				/*
				getThreads("me", "THREAD_ID", function (dataMessage) {
					var temp = dataMessage.messages[0].payload.headers;
					console.log("dataItem.value");
					$.each(temp, function (j, dataItem) {
						if (dataItem.name == "From") {
							console.log(dataItem.value);
						}
					}); 
				console.log("End of for loop");
				});*/
		});
	});
}

function listThreads(userId, callback) {
	var request = gapi.client.gmail.users.threads.list({
		  'userId': userId
	});
	request.execute(callback);
}

function getThreads(userId, id, callback) {
	console.log("	In getThreads: id=" + id);
	var request = gapi.client.gmail.users.threads.get({
		'userId':userId,
		'id':id
	});

	request.execute(callback);
}
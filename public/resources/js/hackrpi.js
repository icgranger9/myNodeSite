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
				
		listMessages('me', '', function (userId, resp, callback) {
			
			console.log(String(resp));

			for(var i = 0; i < resp.length; i++) {
				console.log("	In getMessages: id=" + resp[i].id);
				var request = gapi.client.gmail.users.messages.get({
					'userId':'me',
					'id': resp[i].id
				});

				request.execute(function(request){
					console.log(request.result.snippet);
					if(request.payload.body.size >0) {
						console.log(request.payload.body.data);
					}

				});
			}
		});

	}); 
}


function listMessages(userId, query, callback) {
	console.log("In List messages");
  	var getPageOfMessages = function(request, result) {
		request.execute(function(resp) {
			result = result.concat(resp.messages);
			var nextPageToken = resp.nextPageToken;
			if (nextPageToken) {
				request = gapi.client.gmail.users.messages.list({
					'userId': 'me',
					'pageToken': nextPageToken,
					'labelIds': 'INBOX',
					'q': query
				});
				getPageOfMessages(request, result);
			} else {
				console.log(result);
  				console.log(result[0]);
				callback('me', result, callback);
			}
		});
	};

	var initialRequest = gapi.client.gmail.users.messages.list({
		'userId': userId,
		'labelIds': 'INBOX',
		'q': query
	});

	getPageOfMessages(initialRequest, []);
}


var extractField = function(json, fieldName) {
	return json.payload.headers.filter(function(header) {
		return header.name === fieldName;
	})[0].value;
};
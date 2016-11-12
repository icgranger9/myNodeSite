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
			gapi.client.load('gmail', 'v1', displayInbox);
		}

		/**
		* Print all Labels in the authorized user's inbox. If no labels
		* are found an appropriate message is printed.
		*/
		function displayInbox() {
		  var request = gapi.client.gmail.users.messages.list({
		    'userId': 'me',
		    'labelIds': 'INBOX',
		    'maxResults': 1000
		  });


			request.execute(function(resp) {
				var messages = resp.messages;
				appendPre('Messages:');

				if (messages && messages.length > 0) {
					for (i = 0; i < messages.length; i++) {
						var message = messages[i];
						appendPre(getHeader(message.payload.headers, 'Subject'))
					}
				} else {
					appendPre('No Labels found.');
				}
			});
		}

		/**
		 * Append a pre element to the body containing the given message
		 * as its text node.
		 *
		 * @param {string} message Text to be placed in pre element.
		 */
		function appendPre(message) {
			var pre = document.getElementById('output');
			var textContent = developerscument.createTextNode(message + '\n');
			pre.appendChild(textContent);
		}

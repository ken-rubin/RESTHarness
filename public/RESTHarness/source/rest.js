////////////////////////////////////////
// rest.js -- REST API interface module.
//
// Returns object instance.
//

"use strict";

define(function () {
	
	try {

		// Define constructor function.
		var functionConstructor = function Rest() {

			try {

				var self = this;			// Über closure.

				///////////////////////////////	
				// Public methods

				// Get/Select.
				self.select = function (objectParameters,
					functionCallbackSuccess,
					functionCallbackError) {

					try {

						// Call down to private method.
						return m_functionRequest("GET",
							objectParameters,
							functionCallbackSuccess,
							functionCallbackError);
					} catch (e) {

						return e;
					}
				};

				// Post/Insert.
				self.insert = function (objectBody,
					functionCallbackSuccess,
					functionCallbackError) {

					try {

						// Call down to private method.
						return m_functionRequest("POST",
							objectBody,
							functionCallbackSuccess,
							functionCallbackError);
					} catch (e) {

						return e;
					}
				};

				// Put/Update.
				self.update = function (objectBody,
					functionCallbackSuccess,
					functionCallbackError) {

					try {

						// Call down to private method.
						return m_functionRequest("PUT",
							objectBody,
							functionCallbackSuccess,
							functionCallbackError);
					} catch (e) {

						return e;
					}
				};

				// Delete/Delete.
				self.delete = function (objectBody,
					functionCallbackSuccess,
					functionCallbackError) {

					try {

						// Call down to private method.
						return m_functionRequest("DELETE",
							objectBody,
							functionCallbackSuccess,
							functionCallbackError);
					} catch (e) {

						return e;
					}
				};

				///////////////////////////////	
				// Private methods

				// Function executes an AJAX transaction to the server 
				// using the specified verb, sending the specified body, 
				// and calling-back on success to the specified callback.
				var m_functionRequest = function (strVerb, objectBody, functionCallbackSuccess, functionCallbackError) {

					try {

						// Allocate COMM object.
						var xmlhr = new XMLHttpRequest();

						// Compile URL parameters, if GET.
						var strParameters = "";
						if (strVerb === "GET") {

							// Extract the keys from the body object.
							// These form the set of URI parameter keys.
							var arrayKeys = Object.keys(objectBody);
							for (var i = 0; i < arrayKeys.length; i++) {

								// Either prefix with '?' or separate with '&'.
								if (strParameters.length === 0) {

									strParameters += "?";
								} else {

									strParameters += "&";
								}

								// Compile the parameters.
								var strKey = arrayKeys[i];
								strParameters += strKey + 
									"=" +
									encodeURIComponent(objectBody[strKey]);
							}
						}

						// Open the specified verb to the well-known end-point.
						xmlhr.open(strVerb, 
							"/rest" + strParameters);

						// Configure for JSON.
						xmlhr.setRequestHeader("Content-Type", 
							"application/json;charset=UTF-8");

						// Wire the onload--called when the transaction is returned.
						xmlhr.onload = function (e) {

							try {

								// If complete...
								if (xmlhr.readyState === 4) {

									// ...and success from the server...
									if (xmlhr.status === 200) {
				
										// Extract result object.
										var objectResponse = JSON.parse(xmlhr.responseText);
										if (objectResponse &&
											objectResponse.success) {

											// ...call the callback, passing the result.
											functionCallbackSuccess(objectResponse.payload);
										} else {

											// Error callback payload is a string.
											functionCallbackError(objectResponse.payload);
										}
									} else {
						
										// ...else, log error.
										functionCallbackError(xmlhr.statusText);
									}
								}
							} catch (e) {

								functionCallbackError(e.message);
							}
						};

						// Also wire error handler.
						xmlhr.onerror = function (e) {

							try {

								// Log error.
								functionCallbackError(xmlhr.statusText);
							} catch (e) {

								functionCallbackError(e.message);
							}
						};

						// Send the object body off with the request, unless GET.
						xmlhr.send((strVerb !== "GET" ? JSON.stringify(objectBody) : undefined));
					} catch (e) {

						// Log error.
						functionCallbackError(e.message);
					}
				};
			} catch (e) {

				alert(e.message);
			}
		};

		// Return an allocated instance of the constructor function.
		return new functionConstructor();
	} catch (e) {

		alert(e.message);
	}
});

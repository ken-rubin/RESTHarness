////////////////////////////////////////
// rest.js -- RESTful API interface module.
//
// Returns object instance.
//

"use strict";

// Define AMD requirejs module.
define(function () {
	
	try {

		// Define constructor function.
		var functionConstructor = function Rest() {

			try {

				var self = this;			// Über closure.

				///////////////////////////////	
				// Public methods

				// select: HTTP/GET/REST.
				// 
				// If objectParameters contains an "_id" property then 
				// this call gets details for the specified mongo document.
				// If objectParameters does not contian an "_id" property
				// then this call gets all document id's in the mongo store.
				//
				// Callback success receives the payload object representing
				// the mongo store document referenced by "_id", else an
				// array containing string id's from each document in mongo.
				// Callback error receives a string indicating the error. 
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

				// insert: HTTP/POST/REST.
				//
				// Inserts the specified objectBody as a mongo document.
				// 
				// Callback success receives the new mongo document id.
				// Callback error receives a string indicating the error. 
				self.insert = function (objectBody,
					functionCallbackSuccess,
					functionCallbackError) {

					try {

						// Ensure objectBody is defined and has defined properties.
						if (!objectBody) {

							throw { 

								message: "No body specified in request to insert."
							};
						}
						var arrayKeys = Object.keys(objectBody);
						if (!arrayKeys ||
							arrayKeys.length === 0) {

							throw {

								message: "No body properties specified in request to insert."
							};
						}

						// Call down to private method.
						return m_functionRequest("POST",
							objectBody,
							functionCallbackSuccess,
							functionCallbackError);
					} catch (e) {

						return e;
					}
				};

				// update: HTTP/PUT/REST.
				//
				// Updates the mongo document specified by objectBody._id, 
				// setting specified property values via the rest of the body.
				//
				// NOTE: objectBody may be a projection of the mongo document.
				// 
				// Callback success receives the updated mongo object id.
				// Callback error receives a string indicating the error. 
				self.update = function (objectBody,
					functionCallbackSuccess,
					functionCallbackError) {

					try {

						// Ensure objectBody is defined and objectBody._id is defined.
						if (!objectBody ||
							!objectBody._id) {

							throw { 

								message: "No _id specified in request to update."
							};
						}

						// Call down to private method.
						return m_functionRequest("PUT",
							objectBody,
							functionCallbackSuccess,
							functionCallbackError);
					} catch (e) {

						return e;
					}
				};

				// delete: HTTP/DELETE/REST.
				//
				// Deletes the mondo document specified by objectBody._id.
				// 
				// Callback success receives the deleted mongo document id.
				// Callback error receives a string indicating the error. 
				self.delete = function (objectBody,
					functionCallbackSuccess,
					functionCallbackError) {

					try {

						// Ensure objectBody is defined and objectBody._id is defined.
						if (!objectBody ||
							!objectBody._id) {

							throw { 

								message: "No _id specified in request to delete."
							};
						}

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
				// and calling-back to success callback or failure callback.
				var m_functionRequest = function (strVerb, objectBody, functionCallbackSuccess, functionCallbackError) {

					try {

						// Allocate COMM object.
						var xmlhr = new XMLHttpRequest();

						// Compile URL parameters, if GET.
						var strParameters = "";
						if (strVerb === "GET" &&
							objectBody) {

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
				
										// ...extract and parse the result object.
										var objectResponse = JSON.parse(xmlhr.responseText);

										// If successsful...
										if (objectResponse &&
											objectResponse.success) {

											// ...call the callback, passing the payload.
											functionCallbackSuccess(objectResponse.payload);
										} else {

											// ...else, call error callback, passing the error string.
											functionCallbackError(objectResponse.payload);
										}
									} else {
						
										// ...else, call error callback, passing the error string.
										functionCallbackError(xmlhr.statusText);
									}
								}
							} catch (e) {

								// Call error callback, passing the error string.
								functionCallbackError(e.message);
							}
						};

						// Also wire error handler.
						xmlhr.onerror = function (e) {

							try {

								// Call error callback, passing the error string.
								functionCallbackError(xmlhr.statusText);
							} catch (e) {

								// Call error callback, passing the error string.
								functionCallbackError(e.message);
							}
						};

						// Send the object body off with the request, unless GET,
						// for which the parameters are sent as part of the URL.
						xmlhr.send((strVerb !== "GET" ? JSON.stringify(objectBody) : undefined));
					} catch (e) {

						// Call error callback, passing the error string.
						functionCallbackError(e.message);
					}
				};
			} catch (e) {

				// Popup error message.
				alert(e.message);
			}
		};

		// Return an allocated instance of the constructor function.
		return new functionConstructor();
	} catch (e) {

		// Popup error message.
		alert(e.message);
	}
});

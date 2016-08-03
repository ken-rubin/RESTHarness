////////////////////////////////////////
// rest.js -- REST API interface module.
//
// Returns module instance.
//

"use strict";

define(function () {
	
	try {

		// Define constructor function.
		var functionConstructor = function Rest() {

			try {

				var self = this;			// Über closure.

                // Function executes an AJAX transaction to the server 
                // using the specified verb, sending the specified body, 
                // and calling-back on success to the specified callback.
                self.request = function (strVerb, objectBody, functionCallback) {

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
                                            functionCallback(objectResponse.payload);
                                        } else {

                                            alert(objectResponse.payload);
                                        }
                                    } else {
                        
                                        // ...else, log error.
                                        alert(xmlhr.statusText);
                                    }
                                }
                            } catch (e) {

                                alert(e.message);
                            }
                        };

                        // Also wire error handler.
                        xmlhr.onerror = function (e) {

                            try {

                                // Log error.
                                console.error(xmlhr.statusText);
                            } catch (e) {

                                alert(e.message);
                            }
                        };

                        // Send the object body off with the request, unless GET.
                        xmlhr.send((strVerb !== "GET" ? JSON.stringify(objectBody) : undefined));
                    } catch (e) {

                        // Log error.
                        alert(e.message);
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

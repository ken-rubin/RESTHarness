///////////////////////////////////////
// main.js -- REST Harness entry point.
//

"use strict";

require(["rest"],
	function (rest) {
	
		try {

			// Wire events and such at document load,
			// also, define the AJAX-request function.
			$(document).ready(function () {

				try {

					// Wire the Get button's click event to SELECT from the server.
					$("#GetButton").click(function () {

						try {

							// Request get from server.

							// Empty object query.
							var objectQuery = {};

							// Get id, if non-falsy, assign id.
							var strId = $("#GetIdInput").val();
							if (strId) {

								objectQuery.mongoId = strId;
							}

							// Get either all ids (no id) or the specified object.
							var exceptionRet = rest.select(objectQuery,
								function (objectPayload) {

									try {

										$("#GetOutputTextArea").text(JSON.stringify(objectPayload));
									} catch (e) {

										alert(e.message);
									}
								},
								function (strError) {

									alert(e.message);
								});
							if (exceptionRet) {

								alert(exceptionRet.message);
							}
						} catch (e) {

							alert(e.message);
						}
					});

					// Wire the Post button's click event to INSERT into the server.
					$("#PostButton").click(function () {

						try {

							// Request post to server.
							var exceptionRet = rest.insert({

									firstName: $("#PostFirstNameInput").val(), 
									lastName: $("#PostLastNameInput").val(),
									eMail: $("#PostEMailInput").val()
								},
								function (objectPayload) {

									try {

										$("#PostOutputTextArea").text(JSON.stringify(objectPayload));
									} catch (e) {

										alert(e.message);
									}
								},
								function (strError) {

									alert(strError);
								});
							if (exceptionRet) {

								alert(exceptionRet.message);
							}
						} catch (e) {

							alert(e.message);
						}
					});

					// Wire the Delete button's click event to DELETE on the server.
					$("#DeleteButton").click(function () {

						try {

							// Null out object query.
							var objectQuery = null;

							// Get id, if non-falsy, allocate query object and assign id.
							var strId = $("#DeleteIdInput").val();

							// Delete object.
							var exceptionRet = rest.delete({ 

									mongoId: strId 
								},
								function (objectPayload) {

									try {

										$("#DeleteOutputTextArea").text(JSON.stringify(objectPayload));
									} catch (e) {

										alert(e.message);
									}
								},
								function (strError) {

									alert(strError);
								});
							if (exceptionRet) {

								alert(exceptionRet.message);
							}
						} catch (e) {

							alert(e.message);
						}
					});

					// Wire the Put button's click event to UPDATE on the server.
					$("#PutButton").click(function () {

						try {

							// Null out object query.
							var objectQuery = null;

							// Get id, if non-falsy, allocate query object and assign id.
							var strId = $("#PutIdInput").val();
							var strFirstName = $("#PutFirstNameInput").val();
							var strLastName = $("#PutLastNameInput").val();
							var strEMail = $("#PutEMailInput").val();

							var objectBody = {

								mongoId: strId
							};
							if (strFirstName) {

								objectBody.firstName = strFirstName;
							}
							if (strLastName) {

								objectBody.lastName = strLastName;
							}
							if (strEMail) {

								objectBody.eMail = strEMail;
							}

							// Update object.
							var exceptionRet = rest.update(objectBody,
								function (objectPayload) {

									try {

										$("#PutOutputTextArea").text(JSON.stringify(objectPayload));
									} catch (e) {

										alert(e.message);
									}
								},
								function (strError) {

									alert(strError);
								});
							if (exceptionRet) {

								alert(exceptionRet.message);
							}
						} catch (e) {

							alert(e.message);
						}
					});
				} catch (e) {

					alert(e.message);
				}
			});
		} catch (e) {

			alert(e.message);
		}
	});

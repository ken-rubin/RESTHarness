////////////////////////////////////////
// Put.js -- HTTP-PUT-Verb route handler.
//
// Export constructor function.

// Include object id definition from mongo.
var ObjectId = require("mongodb").ObjectId;

// Define constructor function.
module.exports = function Put(app) {

	var self = this;					// Über closure.

	// Hold reference to application.
	self.app = app;

	// Route handles GET-type HTTP requests.
	self.routeHandler = function (req, res) {

		 try {

			// Entry log:
			console.log("Enter: Put.routeHandler.\n  req.body: " + 
				JSON.stringify(req.body) +
				",\n  req.query: " +
				JSON.stringify(req.query));

			// Extract the mongo collection.
			var mongoCollection = self.app.get("mongoCollection");

			// Extract the id to delete.
			var strMongoId = req.body.mongoId;
			if (strMongoId) {

				// Remove the "fake" id.
				delete req.body.mongoId;

				// Update existing document.
				console.log("Update: " + 
					strMongoId);
				mongoCollection.updateOne({

						"_id": ObjectId(strMongoId)
					},
					{

						$set: req.body
					});

				// Return success.
				console.log("Success.");
				res.json({

					success: true,
					payload: strMongoId
				});
			} else {

				// Return error.
				console.log("Error: No id specified for update.");
				res.json({

					success: false,
					payload: "No id specified for update."
				});
			}
		 } catch(e) {

			// Return error.
			console.log("Error: " + 
				e.message);
			res.json({

				success: false,
				payload: e.message
			});
		 }
	 };
};

////////////////////////////////////////
// Delete.js -- HTTP-DELETE-Verb route handler.
//
// Export constructor function.

// Include object id definition from mongo.
var ObjectId = require("mongodb").ObjectId;

// Define constructor function.
module.exports = function Delete(app) {

	var self = this;					// Über closure.

	// Hold reference to application.
	self.app = app;

	// Route handles GET-type HTTP requests.
	self.routeHandler = function (req, res) {

	     try {

	     	// Entry log:
	        console.log("Enter: Delete.routeHandler.\n  req.body: " + 
	        	JSON.stringify(req.body) +
	        	",\n  req.query: " +
	        	JSON.stringify(req.query));

	        // Extract the mongo collection.
	        var mongoCollection = self.app.get("mongoCollection");

	        // Extract the id to delete.
	        var strMongoId = req.body.mongoId;
			if (strMongoId) {

		        // Delete existing document.
				console.log("Delete: " + 
					strMongoId);
				var wcRet = mongoCollection.remove({

					"_id": ObjectId(strMongoId)
				});

				// Output result object.
				console.log(JSON.stringify(wcRet));

				// Return success.
				console.log("Success.");
		        res.json({

		            success: true,
		            payload: strMongoId
		        });
			} else {

				// Return error.
				console.log("Error: No id specified for delete.");
		        res.json({

		            success: false,
		            payload: "No id specified for delete."
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

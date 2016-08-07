//////////////////////////////
// Rest node module encapsulates a Restful series of 
// endpoints with a mongodb and express application.

// Define exported component.
module.exports = function Rest(app) {

	var self = this;					// Über closure.

	// Wire routes for this restful service.
	self.install = function (strMongoDBListeningPort, strMongoDBCollectionName, functionCallbackSuccess) {

		try {

			// Require Rest module components.
			console.log("\nRequire Rest module components (" + 
				strMongoDBCollectionName + 
				"):");

			console.log("mongodb...");
			var mongoClient = require('mongodb').MongoClient;
			console.log("Get...");
			var Get = require("./Get");
			console.log("Post...");
			var Post = require("./Post");
			console.log("Delete...");
			var Delete = require("./Delete");
			console.log("Put...");
			var Put = require("./Put");

			// Allocate Rest module handlers.
			console.log("\nAllocate Rest module handlers (" + 
				strMongoDBCollectionName + 
				"):");

			console.log("Get...");
			var moduleGet = new Get(app,
				strMongoDBCollectionName);
			console.log("Post...");
			var modulePost = new Post(app,
				strMongoDBCollectionName);
			console.log("Delete...");
			var moduleDelete = new Delete(app,
				strMongoDBCollectionName);
			console.log("Put...");
			var modulePut = new Put(app,
				strMongoDBCollectionName);

			// Wire Rest module routes.
			console.log("\nWire Rest module routes (" + 
				strMongoDBCollectionName + 
				"):");

			console.log("REST POST...");
			app.post("/" + strMongoDBCollectionName, 
				modulePost.routeHandler);
			console.log("REST GET...");
			app.get("/" + strMongoDBCollectionName, 
				moduleGet.routeHandler);
			console.log("REST PUT...");
			app.put("/" + strMongoDBCollectionName, 
				modulePut.routeHandler);
			console.log("REST DELETE...");
			app.delete("/" + strMongoDBCollectionName, 
				moduleDelete.routeHandler);

			// Connect to mongo.
			console.log("\nConnect to Rest module mongodb (" + 
				strMongoDBCollectionName + 
				")...");
			mongoClient.connect("mongodb://localhost:" + 
					strMongoDBListeningPort + 
					"/" + 
					strMongoDBCollectionName, 
				function(err, db) {

					if (err) {

						return console.log("\n***ASYNC***\nError: " + 
							err + 
							"\n***ASYNC***\n");
					}

					console.log("\n***ASYNC***\nGot MongoDB object.\n***ASYNC***\n");

					// Store in app so route handlers can access.
					app.set("MongoDBCollection_" + strMongoDBCollectionName, 
						db.collection(strMongoDBCollectionName));
				});

			// Call back success.
			functionCallbackSuccess();

			return null;
		} catch (e) {

			return e;
		}
	};
};

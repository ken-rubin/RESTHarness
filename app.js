////////////////////////////////////////
// app.js -- node.js web server.
//

////////////////////////////////////////
// Allocate core objects.
console.log("\nRequire application components:");

console.log("assert...");
var assert = require('assert');
console.log("body-parser...");
var bodyParser = require('body-parser');
console.log("express...");
var express = require("express");
console.log("path...");
var path = require("path");
console.log("Rest...");
var Rest = require("./modules/Rest");

////////////////////////////////////////
// Read command line arguments.
console.log("\nRead command line arguments:");
if (process.argv.length != 6) {

	console.log("Usage: 'node app.js [EXPRESS PORT] [EXPRESS PUBLIC FOLDER] [MONGODB LISTENING PORT] [MONGODB COLLECTION NAME]'");
	return;
}

console.log("Express port...");
var strPort = process.argv[2];
console.log("Express port <= " + 
	strPort);
console.log("Express public folder...");
var strPublicFolder = path.join(path.dirname(require.main.filename), 
		process.argv[3]);
console.log("Express public folder <= " + 
	strPublicFolder);
console.log("MongoDB listening port...");
var strMongoDBListeningPort = process.argv[4];
console.log("MongoDB listening port <= " + 
	strMongoDBListeningPort);
console.log("MongoDB collection name...");
var strMongoDBCollectionName = process.argv[5];
console.log("MongoDB collection name <= " + 
	strMongoDBCollectionName);

////////////////////////////////////////
// Allocate the express web server.
console.log("\nAllocate express application...");
var app = express();

////////////////////////////////////////
// Allocate the Rest module.
console.log("\nAllocate Rest module...");
var rest = new Rest(app);

////////////////////////////////////////
// Wire middlewhere.
console.log("\nWire middleware:");

console.log("body-parser...");
app.use(bodyParser.json());
console.log("express.errorHandler...");
app.use(express.errorHandler());
console.log("express.favicon...");
app.use(express.favicon());
console.log("express.logger...");
app.use(express.logger("dev"));

////////////////////////////////////////
// Wire routes.
console.log("\nWire routes:");

console.log("CORS...");
app.use(function(req, res, next) {

	res.header("Access-Control-Allow-Origin", 
		"*");
	res.header("Access-Control-Allow-Headers", 
		"Content-Type, Authorization");

	// Pass to next route.
	next();
});
console.log("express.static...");
app.use(express.static(strPublicFolder));
console.log("express.directory...");
app.use(express.directory(strPublicFolder));

////////////////////////////////////////
// Install Rest module.
console.log("\nInstall Rest module:");
var exceptionRet = rest.install(strMongoDBListeningPort,
	strMongoDBCollectionName,
	function () {

		console.log("\n***ASYNC***\nRest module installed (" + 
			strMongoDBCollectionName + 
			").\n***ASYNC***\n");
	});
if (exceptionRet) {

	throw exceptionRet;
}

////////////////////////////////////////
// Start the server.
console.log("\nStart express server...");
app.listen(strPort,
	function () {

		console.log("\n***ASYNC***\nServer listening on port: " + 
			strPort + 
			".\n***ASYNC***\n");
	});


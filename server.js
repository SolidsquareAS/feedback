var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var PAIRS_COLLECTION = "pairs";
var MEMBER_COLLECTION = "members";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

var baseUrl = "/members";
app.get(baseUrl, function (req, res) {
});

app.post(baseUrl, function (req, res) {
  db.collection(MEMBER_COLLECTION).insertOne(getNewMember(req.body || {}), function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new member.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/**
 *  "/members/:id"
 *    GET: find member by id
 *    PUT: update member by id
 *    DELETE: deletes member by id
 */
app.get(baseUrl + "/:id", function (req, res) {
});

app.put(baseUrl + "/:id", function (req, res) {
});

app.delete(baseUrl + "/:id", function (req, res) {
});

/**
 * Validates and creates a new member
 * @param input {{userId: String, name: String, startDate: Date}}
 * @returns {{createdDate: Date, userId: String, name: String, startDate: Date}}
 */
function getNewMember(input) {
  var newMember = {};

  newMember.createDate = new Date();
  newMember.userId = input.userId;

  if (!(input.userId && input.userId.length === 7)) {
    handleError(res, "Invalid user input", "Must provide a userId with 7 characters.", 400);
  }

  newMember.name = input.name || input.userId;
  newMember.startDate = input.startDate || new Date();
  return newMember;
}

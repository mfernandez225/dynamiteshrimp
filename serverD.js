// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 5050;

// Sets up the Express app to handle data parsing
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

// Reserved tables array.
var reservedTables = [

]

var waitList = [

]

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// routes to reservation page
app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

// routes to tables page
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});
// display api tables
app.get("/api/tables", function(req, res) {
    return res.json(reservedTables);
});

app.get("/api/reserve", function(req, res) {
    return res.json(waitList);
});
// Reserve a table and takes JSON input
app.post("/api/tables", function(req, res) {
    var reserve = req.body;

    console.log(reserve);
    if (reservedTables.length !== 5) {
        reservedTables.push(reserve);
    } else {
        waitList.push(reserve);
    }
    res.json(reserve);


})
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
var express = require("express");
var app = express();
var Crypto = require('crypto-js');
var Twitter = require('twitter-node-client').Twitter;

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://familyhistoryuser:elijah@localhost:5432/familyhistory"

const pool = new Pool({connectionString: connectionString});

app.set("port", (process.env.PORT || 5000));




app.get("/", function(req, res) {
    res.write("<h1>Root Page</h1>");
})
app.get("/getTable", getTable);
app.get("/getTwitter", getTwitterSearch);



app.listen(app.get("port"), function() {
    console.log("Now listening for connections on port: ", app.get("port"));
});




function getTable(req, res) {
    console.log("Getting person");
    
    var id = req.query.id;
    console.log("Got person with id: ", id);
    
    getTableFromDB(id, function(error, result) {
        //res.write(result[0]);  ---- This line crashes the server
        
        console.log("Back from DB with result: ", result);
        res.json(result);
    });
}

function getTableFromDB(id, callback) {
    console.log("getTableFromDB called with id: ", id);
    
    var sql = "SELECT id, username, hash FROM auser WHERE id = $1::int";
    var params = [id];
    
    pool.query(sql, params, function(error, result) {
        if (error) {
            console.log("An error with DB occured");
            console.log(error);
            callback(error, null);
        }
        
        console.log("Found result: " + JSON.stringify(result.rows));
        
        callback(null, result.rows);
    });
}

function getTwitterSearch(req, res) {
    console.log("Connecting to Twitter");
    
    var twitter = connectToTwitter();
    
    
    //Test API connection
    console.log("Getting Results");
    twitter.getSearch({'q':'#haiku','count': 10}, twitterError, 
        function(data){
            console.log('Data [%s]', data);
            res.write(data);
    });
    res.write("<h1>Searching for #haiku</h1>");
}

var twitterError = function (err, response, body) {
	console.log('ERROR [%s]', err);
};

function connectToTwitter() {
    var config = {
    	"consumerKey": "D8z50q6GDF7d04Jk1MAizoDGV",
    	"consumerSecret": "vuevTwP0NNeF9vkiYYK2Ffq1mPtoiNbpe5NEFOyMItzwQN1fk9",
    	"accessToken": "955523061196795904-SUaA0tlud7jHZGV6va7dH7P7gvddSK2",
    	"accessTokenSecret": "cbBen7L13kmCJPQauwkgRJ9VWRYrQEF9RClA25MGkfyDs"
	};
    
    return new Twitter(config);
}


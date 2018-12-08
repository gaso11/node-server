var express = require("express");
var app = express();
var bcrypt = require("bcrypt");
var Twitter = require('twitter-node-client').Twitter;
var parseurl = require('parseurl');
var session = require('express-session');
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://familyhistoryuser:elijah@localhost:5432/familyhistory"
const pool = new Pool({connectionString: connectionString});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'keyboard car',
    resave: false,
    saveUninitialized: true
}));

app.set("port", (process.env.PORT || 5000));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.write("<h1>Root Page</h1>");
});
app.get("/twitterSearch", function(req, res) {
    var params = {};
    res.render("twitterSearch", params);
});
app.get("/getTable", getTable);
app.get("/getTwitter", getTwitterSearch);
app.post("/signup", signup);
app.post("/login", login);

app.listen(app.get("port"), function() {
    console.log("Now listening for connections on port: ", app.get("port"));
});

/**********************************************************
* DATABASE
**********************************************************/

function getTable(req, res) {
    //Test function, just call getTableFromDB() elsewhere
    console.log("Getting person");
    
    var id = req.query.id;
    console.log("Got person with id: ", id);
    
    getTableFromDBid(id, function(error, result) {
        console.log("Back from DB with result: ", result);
        res.json(result);
    });
}

function getTableFromDBid(id, callback) {
    //I'm not sure if I'll need to look up by id in the future, so I'll make
    //another version of this with username instead
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

function signup(req, res) {
    var username = req.query.user;
    var password = req.query.pass;
    
    var hash = bcrypt.hashSync(password, 10);
    
    insertUserInDB(username, hash, function(err, result){
        res.json(result);
    });
}

function insertUserInDB(user, hashp, callback){
    console.log("About to insert user");
    
    //Reference DB.sql if this doesn't work...it should though.
    //If it doesn't work, its probs the variables.
    var sql = "INSERT INTO auser(username, hash) VALUES ($1::text, $2::text)";
    var params = [user, hashp];
    
    pool.query(sql, params, function(error, result) {
        if (error) {
            console.log("An error with DB occured");
            console.log(error);
            callback(error, null);
        }
        
        callback(null, result);
    });
}

function login(req, res) {
    var username = req.query.user;
    var password = req.query.pass;
    var DBHash = "";
    
    getTableFromDBuser(username, function(error, result) {
        DBHash = result[0].hash;
        if(bcrypt.compareSync(password, DBHash)) {
            //"Login" the person
            req.session.user = result[0].username;
            
            //Pass the session user back for anything client-side
            res.json(req.session.user);
        }
        else {
            res.send("Failed");
            res.end();
        }
        
    });
}

function getTableFromDBuser(user, callback) {
    console.log("getTableFromDB called with user: ", user);
    
    var sql = "SELECT id, username, hash FROM auser WHERE username = $1::text";
    var params = [user];
    
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

/**********************************************************
* TWITTER
**********************************************************/

var twitterError = function (err, response, body) {
	console.log('ERROR [%s]', err);
};

function getTwitterSearch(req, res) {
    console.log("Connecting to Twitter");
    
    var twitter = connectToTwitter();
    var response = "Default response";
    var searchString = req.query.search;
    
    //API connection - passes back "body" - hopefully JSON data/string.
    console.log("Getting Results");
    twitter.getSearch({'q': searchString,'count': 10}, twitterError, 
        function(data){
            res.json(data);
    });
}

function connectToTwitter() {
    var config = {
    	"consumerKey": "D8z50q6GDF7d04Jk1MAizoDGV",
    	"consumerSecret": "vuevTwP0NNeF9vkiYYK2Ffq1mPtoiNbpe5NEFOyMItzwQN1fk9",
    	"accessToken": "955523061196795904-SUaA0tlud7jHZGV6va7dH7P7gvddSK2",
    	"accessTokenSecret": "cbBen7L13kmCJPQauwkgRJ9VWRYrQEF9RClA25MGkfyDs"
	};
    
    return new Twitter(config);
}



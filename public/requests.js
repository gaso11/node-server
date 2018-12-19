const saltRounds = 10;

function openLogin() {
    var modal = document.getElementById('myModalL');
    var user = $('#loginUser').val();
    var pass = $('#loginPass').val();
    
    $.post("/login?user=" + user + "&pass=" + pass, function(data, status){
        if (data != "Failed")
        {
            modal.style.display = "none";
            document.getElementById('welcome').innerHTML = "Welcome " + user + "!";
        }
        else
        {
            alert("Username or password not recognized");
        }
    });
}

function startSignup() {
    //Just hard code right now
    var modal = document.getElementById('myModalS');
    var user = $('#signupUser').val();
    var pass = $('#signupPass').val();
    
    if (pass == "") {
        alert("Password cannot be blank");
    }
    else {
    
        $.post("/signup?user=" + user + "&pass=" + pass, function(data, status){
        if (data != null)
        {
            modal.style.display = "none";
            alert("Signup complete");
        }
        else
        {
            alert("That username has already been taken");
        }
	   });  
    }
    
    
}

function startSearch() {
    console.log("Starting Search");
    
    var param = $("#search").val();
    var response = '';
    
    //Call endpoint to start AJAX on server-side
    $.get("/getTwitter?search=" + param, function(data, status){
		response = JSON.parse(data);
        formatData(response);
	});
}

function formatData(response) {
    
    //This probably should be in a loop in case I want to add more or less,
    //but it works for now.
    
    //Post 1
    document.getElementById("bq1").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[0].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[0].user.screen_name + "\">" + 
        response.statuses[0].user.screen_name + "</a></blockquote>" + 
        "<button type=\"button\" id=\"bt0\" onclick=saveToFav(document.getElementById(\"bq1\").textContent)>" +
        "Save to Favorites</button>";
    
    //Post 2
    document.getElementById("bq2").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[1].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[1].user.screen_name + "\">" + 
        response.statuses[1].user.screen_name + "</a></blockquote>" + 
        "<button type=\"button\" id=\"bt1\" onclick=saveToFav(document.getElementById(\"bq2\").textContent)>" +
        "Save to Favorites</button>";

    //Post 3
    document.getElementById("bq3").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[2].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[2].user.screen_name + "\">" + 
        response.statuses[2].user.screen_name + "</a></blockquote>" + 
        "<button type=\"button\" id=\"bt2\" onclick=saveToFav(document.getElementById(\"bq3\").textContent)>" +
        "Save to Favorites</button>";
    
    //Post 4
    document.getElementById("bq4").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[3].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[3].user.screen_name + "\">" + 
        response.statuses[3].user.screen_name + "</a></blockquote>" + 
        "<button type=\"button\" id=\"bt3\" onclick=saveToFav(document.getElementById(\"bq4\").textContent)>" +
        "Save to Favorites</button>";
    
    //Post 5
    document.getElementById("bq5").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[4].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[4].user.screen_name + "\">" + 
        response.statuses[4].user.screen_name + "</a></blockquote>" + 
        "<button type=\"button\" id=\"bt4\" onclick=saveToFav(document.getElementById(\"bq5\").textContent)>" +
        "Save to Favorites</button>";
    
    //Post 6
    document.getElementById("bq6").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[5].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[5].user.screen_name + "\">" + 
        response.statuses[5].user.screen_name + "</a></blockquote>" + 
        "<button type=\"button\" id=\"bt5\" onclick=saveToFav(document.getElementById(\"bq6\").textContent)>" +
        "Save to Favorites</button>";
    
    //Post 7
    document.getElementById("bq7").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[6].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[6].user.screen_name + "\">" + 
        response.statuses[6].user.screen_name + "</a></blockquote>" + 
        "<button type=\"button\" id=\"bt6\" onclick=saveToFav(document.getElementById(\"bq7\").textContent)>" +
        "Save to Favorites</button>";
    
    //Post 8
    document.getElementById("bq8").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[7].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[7].user.screen_name + "\">" + 
        response.statuses[7].user.screen_name + "</a></blockquote>" + 
        "<button type=\"button\" id=\"bt7\" onclick=saveToFav(document.getElementById(\"bq8\").textContent)>" +
        "Save to Favorites</button>";
    
    //Post 9
    document.getElementById("bq9").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[8].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[8].user.screen_name + "\">" + 
        response.statuses[8].user.screen_name + "</a></blockquote>" + 
        "<button type=\"button\" id=\"bt8\" onclick=saveToFav(document.getElementById(\"bq9\").textContent)>" +
        "Save to Favorites</button>";
    
    //Post 10: Sometimes it doesn't load the last post so I get an error,
    //This IF is here to prevent that.
    if (response.statuses[9].text){
    document.getElementById("bq10").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[9].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[9].user.screen_name + "\">" + 
        response.statuses[9].user.screen_name + "</a></blockquote>" + 
        "<button type=\"button\" id=\"bt9\" onclick=saveToFav(document.getElementById(\"bq10\").textContent)>" +
        "Save to Favorites</button>";
    }
};

function searchToFavs() {
    document.getElementById("searchResults").style.display = "none";
    document.getElementById("favs").style.display = "block";
    
    refreshFavs();
}

function favsToSearch() {
    document.getElementById("favs").style.display = "none";
    document.getElementById("searchResults").style.display = "block";
}

function saveToFav(post) {
    //My button text gets squished in there
    post = post.split("Save to Favorites");
    
    //Ajax to save
    ajaxString = "/save?post=" + post;
    
    $.post(ajaxString, function(data, status){
        alert("Post Saved!");
    })
}

function refreshFavs(){
    
    //Ajax to refresh page and get text
    $.post("/refresh", function(data, status){
        posts = data.rows;
        console.log(posts);
        
        //Format function
        formatFavs(posts);
    });
}

function formatFavs(posts){
    alert("Loading");
    
    numPosts = posts.length;
    console.log("There are this many posts: " + numPosts);
    var string = "";
    
    for(i=0; i < numPosts; i++) {
        //Get rid of the "nothing is here" text
        document.getElementById("divfavs").innerHTML = "";
        
        //Add new text
        var tmpString =
            "<div id=\"fbq" + [i] + "\">" +
            "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
            posts[i].text +
            "</div><br>";
        
        string += tmpString;
    }
    
    document.getElementById("divfavs").innerHTML = string;
}


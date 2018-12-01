function startSearch() {
    console.log("Starting Search");
    
    var param = $("#search").val();
    var response = '';
    
    //Call endpoint to start AJAX on server-side
    $.get("/getTwitter?search=" + param, function(data, status){
		response = JSON.parse(data);
        console.log(response);
        formatData(response);
	})
}

function formatData(response) {
    
    //This probably should be in a loop in case I want to add more or less,
    //but it works for now.
    
    //Post 1
    document.getElementById("bq1").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[0].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[0].user.screen_name + "\">" + 
        response.statuses[0].user.screen_name + "</a>";
    
    //Post 2
    document.getElementById("bq2").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[1].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[1].user.screen_name + "\">" + 
        response.statuses[1].user.screen_name + "</a>";

    //Post 3
    document.getElementById("bq3").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[2].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[2].user.screen_name + "\">" + 
        response.statuses[2].user.screen_name + "</a>";
    
    //Post 4
    document.getElementById("bq4").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[3].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[3].user.screen_name + "\">" + 
        response.statuses[3].user.screen_name + "</a>";
    
    //Post 5
    document.getElementById("bq5").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[4].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[4].user.screen_name + "\">" + 
        response.statuses[4].user.screen_name + "</a>";
    
    //Post 6
    document.getElementById("bq6").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[5].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[5].user.screen_name + "\">" + 
        response.statuses[5].user.screen_name + "</a>";
    
    //Post 7
    document.getElementById("bq7").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[6].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[6].user.screen_name + "\">" + 
        response.statuses[6].user.screen_name + "</a>";
    
    //Post 8
    document.getElementById("bq8").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[7].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[7].user.screen_name + "\">" + 
        response.statuses[7].user.screen_name + "</a>";
    
    //Post 9
    document.getElementById("bq9").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[8].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[8].user.screen_name + "\">" + 
        response.statuses[8].user.screen_name + "</a>";
    
    //Post 10: Sometimes it doesn't load the last post so I get an error,
    //This IF is here to prevent that.
    if (response.statuses[9].text){
    document.getElementById("bq10").innerHTML =
        "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">" +
        response.statuses[9].text + "</p>" + "@" + 
        "<a href=\"https://twitter.com/" + response.statuses[9].user.screen_name + "\">" + 
        response.statuses[9].user.screen_name + "</a>";
    }
};
require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
    function Spotify(id, secret) {
        this.id = id;
        this.secret = secret;
    };
var Spotify = require("node-spotify-api");

var axios = require("axios");
var moment = require("moment");

var fs = require("fs");

var a = process.argv[2];
var b = process.argv;
var user = [];
    for (i = 3; i < b.length; i++) {
        user.push(b[i]);    
    }


function searchIt (a) {

// Bands In Town API
    if (a === "concert-this") {
        axios
            .get("https://rest.bandsintown.com/artists/" + user + "/events?app_id=codingbootcamp")
            .then(function(response) {
                for (j = 0; j < 10; j++) {
                    console.log("Venue: " + response.data[j].venue.name);
                    console.log("Location: " + response.data[j].venue.city + ", " + response.data[j].venue.region);
                    var date = response.data[j].datetime;
                    console.log("Event Date: " + moment(date).format("MM/DD/YYYY"));
                    console.log("\r\n");
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    
// Spotify API
    } else if (a === "spotify-this-song") {

        spotify.search({type: 'track', query: user, limit: 10}, function(err,data) {
        
            if (err) {
                return console.log('Error occurred: ' + err);
            };        
            console.log(data);
    
        });

// IMDb API
    } else if (a === "movie-this") {

        axios
            .get("https://www.omdbapi.com/?t=" + user + "&y=&plot=short&apikey=trilogy")
            .then(function(response) {
                movieReturn(response)
            })
            .catch(function(error) {
                console.log(error);
            
            axios
                .get("https://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy")
                .then(function(response) {
                    movieReturn(response)
                });
            });

// Read random.txt file            
    } else if (a === "do-what-it-says") {

        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            };

            var dataArr = data.split(",");
            console.log(dataArr);
            a = dataArr[0];
            user.push = dataArr[1];
            searchIt(a);  
        });
    };
};

searchIt(a);

// IMDb info
function movieReturn (response) {
    console.log("Movie Title: " + response.data.Title);
    console.log("Movie Release Year: " + response.data.Year);
    console.log("IMDb Rating: " + response.data.imdbRating);
    ratingSearch(response);
    console.log("Country of Production: " + response.data.Country);
    console.log("Language Releases: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
}
// To Find Rotten Tomatoes Rating
function ratingSearch (response) {
    for (k = 0; k < response.data.Ratings.length; k++) {
        if (response.data.Ratings[k].Source === "Rotten Tomatoes") {
            console.log(response.data.Ratings[k].Source + " rating is: " + response.data.Ratings[k].Value);
        } 
    }
}

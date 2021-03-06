require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");

var fs = require("fs");

var a = process.argv[2].toLowerCase();
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

        if (b.length === 3) {
            spotify.search({type: 'track', query: "the sign", limit: 10}, function(err,data) {
            
                if (err) {
                    return console.log('Error occurred: ' + err);
                };        
                
                l=9
                musicReturn(data, l);                               
            });

        } else {

            spotify.search({type: 'track', query: user.toString(), limit: 5}, function(err,data) {
            
                if (err) {
                    return console.log('Error occurred: ' + err);
                };        

                for (l = 0; l < 5; l++) {
                    musicReturn(data, l);
                };
            });
        }

// IMDb API
    } else if (a === "movie-this") {
        
        if (b.length === 3) {
            axios
                .get("https://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy")
                .then(function(response) {
                    movieReturn(response)
                });
        } else {

            axios
                .get("https://www.omdbapi.com/?t=" + user + "&y=&plot=short&apikey=trilogy")
                .then(function(response) {
                    movieReturn(response)
                })
                .catch(function(error) {
                    console.log(error);  
                });
        }
// Read random.txt file            
    } else if (a === "do-what-it-says") {

        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            };

            var dataArr = data.split(",");
            a = dataArr[0];
            b.push(dataArr[1]);
            user.push(dataArr[1]);
            
            searchIt(a);  
        });
    };
};

searchIt(a);

// Spotify Response Info
function musicReturn (data, l) {
    console.log("\r\n");
    console.log("Artist Name: " + data.tracks.items[l].artists[0].name);
    console.log("Track Name: " + data.tracks.items[l].name);
    console.log("Link for song preview: " + data.tracks.items[l].preview_url)
    console.log("Album Name: " + data.tracks.items[l].album.name);
}

// IMDb Resoponse Info
function movieReturn (response) {
    console.log("\r\n");
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

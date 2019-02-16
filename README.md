# liri-node-app

This is a node.js based app.  You will need your own Spotify API keys to run the app.  
The app uses the Spotify API, BandsInTown API, and IMDb API to search for song details, artist events, or movie details.
It also makes us of multiple node modules that are imported to run the app as well to return info based on the search parameters given.

In node, you will enter one of the following commands:
* node liri.js concert-this <artist/band name> which will search upcoming 10 events (if available) for an artist/band.
* node liri.js spotify-this-song <song title> which will search the possible songs with this title and present the details of the song.
* node liri.js movie this <movie title> which will give you details of the movie given.
* node liri.js do-what-it-says which will read a certain text file provided and do what that text file has written in it.

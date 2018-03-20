var params = process.argv.slice(2);

var request = require('request');  //takes in request npm
var auth = require('./secrets');  // connects to auth code in secret file
var fs = require('fs');           // takes in fs npm

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {     // options variable for request function
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': auth.GITHUB_TOKEN
    }
  };
  if (repoOwner === undefined) {
    console.log("ERROR ERROR. Submit values with your human fingers.")
  }
  request(options, function(err, res, body) {   //requests info from GitHub API
    cb(err, body);
  });
}

console.log('Welcome to the GitHub Avatar Downloader!');    // Welcome message on load

getRepoContributors(params[0], params[1], function(err, result) {
  console.log("Errors:", err);
  console.log("Initializing downloader.")
  for (var i = 0; i < result.length; i++) {
    var filePath = 'avatars/' + result[i].login + ".jpg";
    downloadImageByURL(result[i].avatar_url, filePath);
  }
  if (result.length > 0) {
    console.log("Total images downloaded: " + result.length)
  } else {console.log("No items downloaded.")}  // final log with total images
});


function downloadImageByURL(url, filePath) {
  console.log("Downloading image...");          // notifying that image started downloading
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
  console.log("Image downloaded!");           // download complete log
}
var request = require('request');
var auth = require('./secrets');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': auth
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}


console.log('Welcome to the GitHub Avatar Downloader!');



getRepoContributors("nodejs", "node", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});





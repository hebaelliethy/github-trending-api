var express = require('express');
var router = express.Router();
const trending = require('trending-github');

router.get('/trending', function (req, res, next) {
  var searchterm = req.query.searchterm;
  var limit = req.query.limit;

  trending()
    .then(repos => {
      var filteredRepos = filterItems(repos, searchterm);
      var limitedRepos = filteredRepos.splice(0, limit);
      var star = limitedRepos.map(repo => repo.stars)
      var sumStars = star.reduce(add, 0);
      res.send({ "Repositry": limitedRepos, "SumStars": sumStars })
    });
});
function add(a, b) {
  return a + b;
}

function filterItems(repos, searchterm) {
  return repos.filter(repo => repo.name.toLowerCase().indexOf(searchterm.toLowerCase()) > -1);
}


module.exports = router;
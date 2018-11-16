var express = require('express');
var router = express.Router();
const trending = require('trending-github');

router.get('/trending', function (req, res, next) {
 
  trending()
    .then(repos => {
      var stars = repos.map(repo => repo.stars)
      var sumStars = stars.reduce(add, 0);
      res.send({ "Repositry": repos, "SumStars": sumStars })
    });


});
function add(a, b) {
  return a + b;
}

module.exports = router;
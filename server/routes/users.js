const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.json([{
      	id: 1,
      	username: "federico"
    }, {
      	id: 2,
      	username: "andres"
    }]);
});

module.exports = router;

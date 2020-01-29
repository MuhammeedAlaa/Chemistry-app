const express = require('express');
const router = express.Router();

/* GET student info page. */
router.get('/', function(req, res) {
    res.render('firstlog');
});
module.exports = router;
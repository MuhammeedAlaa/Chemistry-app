const express = require('express');
const { isauth } = require('../utils/auth');
const router = express.Router();
router.get('/', function(req, res) {
    const { role } = isauth(req);
    if (role == 'assistant') {
        res.render('AssistantStudent');
    } else {
        res.redirect('/');
    }
});
module.exports = router;
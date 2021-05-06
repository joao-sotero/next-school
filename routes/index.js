var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',(req, res) => {
    // req.session.destroy()
    return res.render('home')
});

router.get('/logout', async function(req, res, next) {
    req.session.destroy(function(err) {
        console.log('Destroyed session')
     })
    res.redirect('/');
});
// http://localhost:3000/


module.exports = router;

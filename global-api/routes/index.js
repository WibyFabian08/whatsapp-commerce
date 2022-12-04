var express = require('express');
var router = express.Router();
const whatsapp = require("../helpers/whatsapp")

/* GET home page. */
router.get('/', function(req, res, next) {
  // whatsapp.createSession("pasteur-trans", false, res)
  res.render('index', { title: 'Express', qr: null });
});

module.exports = router;

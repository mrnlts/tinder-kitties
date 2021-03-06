const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;

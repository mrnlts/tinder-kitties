const express = require('express');
const Cat = require('../models/cat');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  // Cat.find({})
  //   .then(cats => cats.map(cat => ({ name: cat.name.toUpperCase() }))
  //   .then((cats) => {
  //     res.render('cats/list', { cats });
  //   })
  //   .catch(error => {
  //     next(error);
  //   });
  Cat.find({})
    .then(cats => {
      res.render('cats/list', { cats });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/create', (req, res) => {
  res.render('cats/create');
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Cat.findById(id)
    .then(cat => {
      res.render('cats/detail', { cat });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/', (req, res, next) => {
  const cat = req.body;
  Cat.create({
    name: cat.name,
  })
    .then(cat => {
      console.log(cat);
      // 💥 la url del redirect es completa no como los paths del middleware
      res.redirect('/cats');
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id', (req, res, next) => {
  const { id } = req.params;
  Cat.findByIdAndDelete(id)
    .then(cat => {
      console.log('delete', cat);
      res.status(301);
      res.redirect('/cats');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/update/:id', (req, res, next) => {
  const { id } = req.params;
  Cat.findOne({'_id': id})
    .then(cat => {
      // res.render('cats/update', {'id': id, name: cat.name});
      res.render('cats/update', cat);
    })
    .catch(err => next(err))
})

router.post('/update/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, age, isSingle, image } = req.body;
  console.log(id);
  Cat.findOneAndUpdate({_id: id} ,{name, age, isSingle, image})
    
    .then(cat => {
      console.log(req.body);
      console.log('updated!', cat);
      res.redirect('/cats');
    })
    .catch(error => {
      next(error);
    });
  });
  
module.exports = router;

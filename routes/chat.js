var express = require('express'),
  router = express.Router();

router.get('/', (req, res) => {
    res.render('chat', {
      title: 'simple chat space'
    });
  },
  id = function (req, res, next) {
    res.render('chat', {
      title: 'simple chat service',
      id: req.params.id
    });
  });
router.post('/:id', (req, res, next) => {
  res.render('chat', {
    title: 'simple chat service',
    id: req.params.id
  });
});

module.exports = router;
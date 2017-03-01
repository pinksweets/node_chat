var express = require('express'),
  router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {
    title: '名前を入力してログインしてください'
  });
});
router.post('/:id(D\\d+)', (req, res, next) => {
  console.log(req.param);
  res.render('chat', {
    title: 'simple chat service',
    id: req.params.id
  });
});

module.exports = router;
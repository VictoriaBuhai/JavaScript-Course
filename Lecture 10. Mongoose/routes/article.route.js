const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');

router.post('/', articleController.createArticle);
router.get('/', articleController.getArticle);
router.put('/:articleId', articleController.editArticle);
router.delete('/:articleId', articleController.deleteArticle);

module.exports = router;

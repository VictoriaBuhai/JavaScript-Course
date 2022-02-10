const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/', userController.createUser);
router.put('/:userId', userController.editUser);
router.get('/:userId', userController.getUser);
router.get('/:userId/articles', userController.getArticlesByUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;

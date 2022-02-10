module.exports = {createUser, editUser, getUser, getArticlesByUser, deleteUser};
const User = require('../models/user');
const Article = require('../models/article');

async function createUser(req, res, next) {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function editUser(req, res, next) {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      let user = await User.findOneAndUpdate(req.params.userId, req.body, {
        new: true
      });
      res.send(user);
    } else {
      throw badRequest();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getArticlesByUser(req, res, next) {
  try {
    // const userId = req.params.id;
    const articles = await Article.find({owner: req.params.userId});
    res.send(articles);
    return articles;
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      let user = await User.findById(req.params.userId);
      const articles = await Article.find({owner: req.params.userId}).populate('owner');
      //user.numberOfArticles = articles.length;
      //user = {...user, numberOfArticles: articles.length, userArticles: articles};
      //console.log(user);
      res.send(user);
    } else {
      throw badRequest();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}
async function deleteUser(req, res, next) {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      await User.findByIdAndDelete(req.params.userId);
      res.sendStatus(200);
    } else {
      throw badRequest();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {createArticle, editArticle, getArticle, deleteArticle};
const {badRequest} = require('../config/errorHelper');
const Article = require('../models/article');
const User = require('../models/user');

async function createArticle(req, res, next) {
  try {
    const user = await User.findById(req.body.owner);
    if (user) {
      const article = new Article(req.body);
      await article.save();
      user.numberOfArticles += 1;
      user.save();
      res.send(article);
    } else {
      throw badRequest();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function editArticle(req, res, next) {
  try {
    const check = await Article.findById(req.params.articleId);
    if (check) {
      if (req.body.owner) {
        const user = await User.findById(req.body.owner);
        if (user) {
          let article = await Article.findOneAndUpdate(req.params.articleId, req.body, {
            new: true
          });
          res.send(article);
        } else {
          throw badRequest();
        }
        if (!req.body.owner) {
          let article = await Article.findOneAndUpdate(req.params.articleId, req.body, {
            new: true
          });
          res.send(article);
        }
      }
    } else {
      throw badRequest();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getArticle(req, res, next) {
  try {
    if (!req.body) {
      const article = await Article.find();
      res.send(article);
    } else {
      const article = await Article.find(req.body);
      res.send(article);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deleteArticle(req, res, next) {
  try {
    const article = await Article.findById(req.params.articleId);
    if (article) {
      const user = await User.findById(article.owner);
      await Article.findByIdAndDelete(req.params.articleId);
      user.numberOfArticles -= 1;
      user.save();
      res.sendStatus(200);
    } else {
      throw badRequest();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

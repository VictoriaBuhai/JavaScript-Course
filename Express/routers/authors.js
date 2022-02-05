const { v4: uuidv4 } = require("uuid");
let authorsArray = [];
//const uuidv4 = require("uuid/v4");
const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  if (!req.body.name) {
    const error = new Error("Bad Request");
    error.status = 400;
    return next(error);
  }
  req.body.id = uuidv4();
  req.body.posts = req.body.posts.map((post, index) => ({
    text: post,
    id: index + 1,
  }));
  if (authorsArray.find((author) => author.id === req.body.id) === -1) {
    authorsArray.push(req.body);
  } else {
    req.body.id = uuidv4();
    authorsArray.push(req.body);
  }

  res.send(req.body);
});

router.delete("/:authorId", (req, res, next) => {
  const length = authorsArray.length;
  authorsArray = authorsArray.filter(
    (author) => author.id !== req.params.authorId
  );
  if (length === authorsArray.length) {
    const error = new Error("Bad Request");
    error.status = 400;
    return next(error);
  }
  res.sendStatus(200);
});

router.get("/", (req, res, next) => {
  if (!authorsArray) {
    const error = new Error("Not Found");
    error.status = 404;
    return next(error);
  }
  res.send(authorsArray);
});

router.get("/:authorId/posts/:postId", (req, res, next) => {
  const author = authorsArray.find(
    (author) => author.id === req.params.authorId
  );
  if (!author) {
    const error = new Error("Not Found");
    error.status = 404;
    return next(error);
  }
  const post = author.posts.find((post) => post.id === +req.params.postId);
  if (!post) {
    const error = new Error("Not Found");
    error.status = 404;
    return next(error);
  }

  res.send(post);
});

router.put("/:authorId", (req, res, next) => {
  let changedAuthor;
  authorsArray = authorsArray.map((author) => {
    if (author.id === req.params.authorId) {
      author.name = req.body.name;
      changedAuthor = author;
    }
  });
  if (!changedAuthor) {
    const error = new Error("Author Not Found");
    error.status = 404;
    return next(error);
  }
  res.send(changedAuthor);
});
module.exports = router;

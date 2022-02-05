const express = require("express");
const app = express();
const PORT = 3000;
const authersRouter = require("./routers/authors");
app.use(express.json());
app.use("/authors", authersRouter);
app.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});
function errorHandler(err, req, res, next) {
  if (err.status) {
    return res.status(err.status).json(err.message);
  }
  return res.status(500).json(err, "Internal Error");
}
app.use(errorHandler);

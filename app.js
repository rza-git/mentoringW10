const express = require('express')
const app = express()
const port = 3000
const errorHandler = require("./middlewares/errorhandler.js")
const router = require("./routes");
const uploadRouter = require("./upload.js");

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(uploadRouter);
app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
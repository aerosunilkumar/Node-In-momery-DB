var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const todos = [];

var port = process.env.PORT || 8123;

var router = express.Router();

router.get("/List", function(req, res) {
  res.json(todos);
});

router.get("/GetById/:id", function(req, res) {
  const index = todos.findIndex(e => e.id === parseInt(req.params.id));
  if (index !== -1) {
    res.json(todos[index]);
  } else {
    res.json({});
  }
});

router.post("/Create", function(req, res) {
  todos.push({ ...req.body, id: todos.length + 1 });
  res.json(req.body);
});

router.put("/Edit", function(req, res) {
  const index = todos.findIndex(e => e.id === req.body.id);
  if (index !== -1) {
    todos[index].name = req.body.name;
  }
  res.json(req.body);
});

router.delete("/delete/:id", function(req, res) {
  const index = todos.findIndex(e => e.id === parseInt(req.params.id));
  if (index !== -1) {
    todos.splice(index, 1);
  }
  res.json(req.body);
});

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.use("/api", router);

app.listen(port);
console.log("express server running on port number : " + port);

var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://handsforpaws:bfPIegDOPjLuqg02@handsforaws.ux3rnyk.mongodb.net/HandsForPaws"
);
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});
var app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/sign_up", function (req, res) {
  var owner = req.body.owner_name;
  var breed = req.body.pet_breed;
  var bgroup = req.body.blood_group;
  var page = req.body.pet_age;
  var num = req.body.contact_number;
  var numalt = req.body.alternate_number;
  var house = req.body.house_no;
  var city = req.body.city;
  var state = req.body.state;

  var data = {
    owner_name: owner,
    pet_breed: breed,
    blood_group: bgroup,
    pet_age: page,
    contact_number: num,
    contact_alternate: numalt,
    house_no: house,
    city: city,
    state: state,
  };
  db.collection("dogs").insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
  });
  return res.redirect("dogs.html");
});

app
  .get("/", function (req, res) {
    res.set({
      "Access-control-Allow-Origin": "*",
    });
    return res.redirect("127.0.0.1:5001/index.html");
  })
  .listen(3000);

console.log("server listening at port 3000");


const express = require('express');
const app = express();

const bodyparser = require("body-parser");

const mongoose = require('mongoose');

const cors = require('cors');
app.use(cors());


app.set('view engine', 'ejs');

app.listen(process.env.PORT || 5000, function (err) {
    if (err)
        console.log(err);
})

app.use(bodyparser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb+srv://packobtainer:37h3YwU3pc9Axpi@cluster0.xw7wz.mongodb.net/test", {useNewUrlParser: true, useUnifiedTopology: true});

const TimesSchema = new mongoose.Schema({
    text: String,
    hits: Number,
    time: Date
});

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    cartHistory: Array,
    type: String
})

const CartSchema = new mongoose.Schema({
    pokemon: Array,
    id: String
})

const userModel = mongoose.model("users", UserSchema);

const timeLineModel = mongoose.model("times", TimesSchema);

const cartModel = mongoose.model("cart", CartSchema);



app.get("/user", function(req, res) {
  userModel.find({}, function(err, data){
    if (err){
      console.log("Error " + err);
    }else{
      console.log("Data "+ JSON.stringify(data) );
    }
    res.send(JSON.stringify(data));
});
})

app.put("/admin/insert", function(req, res) {
  userModel.create({
    'email': req.body.email,
    'password': req.body.password,
    'cartHistory': [],
    'type': req.body.type
  }, function(err, data) {
    if (err){
      console.log("Error " + err);
    }else{
      console.log("Data "+ JSON.stringify(data) );
    }
    res.send(JSON.stringify(data));
  });
})

app.post('/admin/update', function(req, res) {
  userModel.updateOne({"_id": req.body.id},{
    $set:{
      'email': req.body.email,
      'password': req.body.password,
      'type': req.body.type
    }
  }, function(err, data){
    if (err){
      console.log("Error " + err);
    }else{
      console.log("Data "+ JSON.stringify(data) );
    }
    res.send(JSON.stringify(data));
});
})

app.post("/admin/delete", function(req, res) {
  userModel.remove({
    '_id': req.body.id
  }, function(err, data){
      if (err){
        console.log("Error " + err);
      }else{
        console.log("Data "+ JSON.stringify(data) );
      }
      res.send(JSON.stringify(data));
  });
})

app.put("/carts", function(req, res) {
  cartModel.create({
    'pokemon': req.body.pokemon,
    'id': req.body.id
  }, function(err, data) {
    if (err){
      console.log("Error " + err);
    }else{
      console.log("Data "+ JSON.stringify(data) );
    }
    res.send(JSON.stringify(data));
  });
})

app.get("/carts/get", function(req, res) {
  cartModel.find({}, function(err, data){
      if (err){
        console.log("Error " + err);
      }else{
        console.log("Data "+ JSON.stringify(data) );
      }
      res.send(JSON.stringify(data));
  });
})

app.put('/times/insert', function(req, res) {
  timeLineModel.create({
    'text': req.body.text,
    'hits': req.body.hits,
    'time': req.body.time
  }, function(err, data){
    if (err){
      console.log("Error " + err);
    }else{
      console.log("Data "+ JSON.stringify(data) );
    }
    res.send(JSON.stringify(data));
});
})

app.get('/times/getAllEvents', function(req, res) {

  timeLineModel.find({}, function(err, data){
      if (err){
        console.log("Error " + err);
      }else{
        console.log("Data "+ JSON.stringify(data) );
      }
      res.send(JSON.stringify(data));
  });
})




app.get('https://fathomless-fortress-22361.herokuapp.com/', function(req, res) {

    res.send('/public/login.html');
    
});

app.get('https://fathomless-fortress-22361.herokuapp.com/index.html', function(req, res) {

    res.send('/public/index.html');

});

app.get('https://fathomless-fortress-22361.herokuapp.com/profile.html', function(req, res) {
      res.send('/public/profile.html');

});

app.get('https://fathomless-fortress-22361.herokuapp.com/search.html', function(req, res) {

      res.send('/public/search.html');

});

app.get('https://fathomless-fortress-22361.herokuapp.com/admin.html', function(req, res) {

      res.send('/public/admin.html');

});

app.get('https://fathomless-fortress-22361.herokuapp.com/game.html', function(req, res) {

      res.send('/public/game.html');

});

app.use(express.static('./public'));
app.use(express.static('/public/pikachu.jpg/'))



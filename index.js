const express = require('express');
const app = express();
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

const port = 5000    
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
var url = "mongodb://localhost:27017/";

app.get('/api', (req, res) => {
  let all="afdsasfd";
res.json(
  all
)
})


app.post('/saveData', (req, res) => {

  const alldata = req.body.data;
  console.log(alldata)

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("invoicedb");
    var myobj = {id :  "1", alldata  };
    dbo.collection("invoicedata").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
})

  app.post('/updateData', (req, res) => {

    const alldata = req.body.data;
    console.log(alldata)

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("invoicedb");
    var myquery = { id : "1" };
    var newvalues = { $set: {alldata } };
    dbo.collection("invoicedata").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });

  })

  app.get('/viewData', (req, res) => {

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("invoicedb");
      //Find the first document in the customers collection:
      dbo.collection("invoicedata").findOne({}, function(err, result) {
        if (err) throw err;
        res.json(
          result
        )
        console.log("results",result);
        db.close();
      });
    });
    
  })
  


app.listen(port, () => console.log(`server runned on port:${port}`))
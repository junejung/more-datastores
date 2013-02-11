var events = require('events');
var mongodb = require('mongodb');
var url = require('url');
var server = new mongodb.Server('127.0.0.1', 27017, {});

var client = new mongodb.Db('nodechat', server);

module.exports = function () {
  client.open(function(err, p_client){
    console.log("Connected to MongoDB!");

    client.createCollection('message', function(err, mescollection) {
      collection = mescollection;
    });
  })
  var db = '';


  var write_db = function (data) {
    console.log(data.roomname + 101);
    collection.insert(data, function(err, docs) {
      console.log("Inserted a document.");
    });
    console.log(data.text+'data written!');
  }

  return {
    select: function (req, res) {
      var room = url.parse(req.url,true).query.roomname;
      collection.find({roomname:room}).toArray(function(err, results){
        var messages = JSON.stringify(results);
        res.end(messages);
      });
    },
    insert: function (r) { write_db(r.body) }
  }
}


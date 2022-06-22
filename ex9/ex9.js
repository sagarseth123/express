var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/";
const prompt = require("prompt");

prompt.start();
console.log("CRUD on pharmacy database using NodeJS and MongoDB\n");
console.log("1.Insert\n2.Update\n3.Delete\n4.Exit\n");
prompt.get(["choice"], (err, result) => {
  if (err) {
    return onErr(err);
  }
  switch (result.choice) {
    case "1":
      console.log("INSERT");
      prompt.get(["cloth_id", "name", "size", "prize"], (err, result) => {
        if (err) {
          return onErr(err);
        }
        console.log("Data from user: \n");
        console.log("Cloth Id - " + result.cloth_id);
        console.log("Name - " + result.name);
        console.log("Size - " + result.size);
        console.log("Prize - " + result.prize);
        MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
          if (err) throw err;
          var dbo = db.db("data");
          var obj = {
            cloth_id: result.cloth_id,
            name: result.name,
            size: result.size,
            prize: result.prize,
          };
          dbo.collection("pharmacy").insertOne(obj, (err, res) => {
            if (err) throw err;
            console.log("Inserted 1 Clothes document !! ");
            db.close();
          });
        });
      });
      break;
    case "2":
      console.log("UPDATE");
      prompt.get(["cloth_id", "name", "size", "prize"], (err, result) => {
        if (err) {
          return onErr(err);
        }
        MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
          if (err) throw err;
          var dbo = db.db("data");
          var query = { cloth_id: result.cloth_id };
          var upd_val = {
            $set: {
              cloth_id: result.cloth_id,
              name: result.name,
              size: result.size,
              prize: result.prize,
            },
          };
          dbo.collection("pharmacy").updateOne(query, upd_val, (err, res) => {
            if (err) throw err;
            if (res.matchedCount)
              console.log(res.modifiedCount + " Clothes document Updated!! ");
            else console.log("Key not Found !! ");
            db.close();
          });
        });
      });
      break;
    case "3":
      console.log("DELETE");
      prompt.get(["cloth_id"], (err, result) => {
        if (err) return onErr(err);
        MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
          if (err) throw err;
          var dbo = db.db("data");
          var query = { cloth_id: result.cloth_id };
          dbo.collection("pharmacy").deleteOne(query, (err, res) => {
            if (err) throw err;
            if (res.deletedCount)
              console.log(res.deletedCount + " Clothes document Deleted!! ");
            else console.log("Key not Found !! ");
            db.close();
          });
        });
      });
      break;
    default:
      console.log("EXIT");
  }
});

function onErr(err) {
  console.log(err);
  return 1;
}

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
var app = express();


app.use(express.static(__dirname + '/public'));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb://localhost:27017/books", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//"mongodb://localhost:27017/attendee"

var bookSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const Book = new mongoose.model("Book",bookSchema);


app.get('/books', function (req, res) {
    //res.send(books);
     Book.find({}, function (err, found) {
        res.send(found);
    });
})

app.post('/add',async function (req, res) {
    //books.push(req.body);
    var book = new Book({
        name: req.body.name,
        price: req.body.price
    });
    await book.save();
    Book.find({}, function (err, found) {
        res.send(found);
    });
})

app.get('/delete/:filename', function (req, res) {
    console.log(req.params.filename);
    Book.deleteOne({ name: req.params.filename }, function (err, obj) {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/books');
        }
    });
});


app.get('/update/:bookname/:bookPrice', function (req, res) {
    console.log(req.params);
    Book.updateOne({ name: req.params.bookname }, { $set: { price: req.params.bookPrice } }, function (err, obj) {
        if (!err) {
            res.redirect('/books');
        }
    });
});

app.listen(3000, function () {
    console.log("server is listening on port 3000");
});
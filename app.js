const express = require('express');
const bodyParser = require('body-parser');

const app = express();
var a=[];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));
app.post("/", (req, res) => {
    var item = req.body.newTask;
    a.push(item);
    res.redirect('/');

});


app.get("/", (req, res) => {

    var today = new Date();
    var option = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };
    var day = today.toLocaleDateString('en-US', option);

    res.render("list", {
        kindOfDay: day,
        newTask: a

    });


});
app.listen(3000, () => console.log("Server started"));
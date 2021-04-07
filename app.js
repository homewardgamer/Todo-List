//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin-aditya:test123@cluster0.hmlzu.mongodb.net/todolistDB", {
    useNewUrlParser: true
});

const itemsSchema = new mongoose.Schema({
    name: String
});
const Item = mongoose.model("Item", itemsSchema);


const item2 =new Item({
    name: "Welcome to Todo-List"
});

const defaultArray=[item2];

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));
app.post("/", (req, res) => {
    const itemName = req.body.newTask;
    const item= new Item({
        name :itemName
    })
    item.save();

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
    Item.find(function(err,foundItems){
        if(err){
            console.log(err);
        }
        else{
            if(foundItems.length===0){
                Item.insertMany(defaultArray,function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Added to DataBase");
                    }
                })
                }
            res.render("list", {
                kindOfDay: day,
                newTask: foundItems
        
            });
        }
    })
});
app.post('/delete',(req,res)=>{
    const delId = req.body.checkbox;
    Item.deleteOne({_id : delId},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Deleted");
            res.redirect('/');
        }
    });


    



});
app.listen(3000, () => console.log("Server started"));
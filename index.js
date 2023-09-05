import express from "express";
import bodyParser from "body-parser";

const app = express();
// const port = process.env.PORT || 3000;
const port = 3000;

var todayTasks = [];
var workTasks = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index.ejs", {items: todayTasks});
});

app.get("/work", (req,res) => {
    res.render("worklist.ejs", {items: workTasks});
});

app.post("/", (req,res) => {
    // console.log(req.body);
    if (req.body.text) {
        todayTasks.push({id: todayTasks.length, done: false, text: req.body.text});
    }
    else {
        // console.log(typeof(req.body.isDone));
        todayTasks[parseInt(req.body.taskId)]["done"] = !(req.body.isDone === 'true'); 
    }
    res.redirect("/");
});

app.post("/work", (req,res) => {
    if (req.body.text) {
        workTasks.push({id: workTasks.length, done: false, text: req.body.text});
    }
    else {
        workTasks[parseInt(req.body.taskId)]["done"] = !(req.body.isDone === 'true'); 
    }
    res.redirect("/work");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

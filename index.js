const express= require("express");
const app = express();
const port= 5501;
const path = require ("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride= require('method-override');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id:uuidv4(),
        username: "a",
        content: "123"
    },
    {
        id:uuidv4(),
        username: "b",
        content: "456"
    },
    {
        id:uuidv4(),
        username: "c",
        content: "789"
    }
];


app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let {username, content}= req.body;
    let id=uuidv4();
    posts.push({id ,username,content});
    // console.log(req.body);
    // res.send("Post request working");
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) => {
    let {id}= req.params;
    console.log(id);
    let post= posts.find((p) =>id===p.id);
    // console.log(post);
    // res.send("Request Working");
    res.render("show.ejs", {post});
})

app.patch("/posts/:id", (req, res) => {
    let {id}= req.params;
    let newContent=req.body.content;
    let post= posts.find((p) =>id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}= req.params;
    let post= posts.find((p) =>id===p.id);
    res.render("edit.ejs", {post});
})
app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
    posts= posts.filter((p) =>id!==p.id);
    res.redirect("/posts");
})

app.listen(port , () => {
    console.log("Listing to port : 5501");
});
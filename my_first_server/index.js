const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");
// const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

let post = [
    {
        username: "KICKS.CO",
        id: uuid(),
        image: "https://th.bing.com/th/id/OIP.Xm0VRVg8uwRQxLTX5GuYsgHaHa?w=181&h=181&c=7&o=5&dpr=1.25&pid=1.7",
        title: "This is a fucking must cop!!!!!!!",
        likes: 0,
        comment: [{
            username: "ibukun adekoya",
            id: uuid(),
            title: "No, bro. looks pretty awful to me",
        }]
    }
];


app.listen(3000, () => {
    console.log("Listening on port 3000");
})
app.get("/", (req, res) => {
    res.render("home");
})
app.get("/post", (req, res) => {
    let see = { post };


    res.render("post", { post });
})
app.patch("/post/like", (req, res) => {
    post = post.map((pos) => {
        if (pos.id === req.body.id) {
            console.log("updating time");
            (pos.likes)++;
        }
        return pos;
    })
    res.redirect("/post");
})
app.get("/post/comment/:id", (req, res) => {
    let index = undefined;
    for (let i = 0; i < post.length; i++) {
        if (req.params.id === post[i].id) {
            index = i;
            break;
        }
    }
    if (index === undefined) {
        res.render("error");
    }
    let set = post[index];
    res.render("comment", { set });
})
app.patch("/post/comment/:id/new_comment", (req, res) => {
    if (req.params.id !== undefined) {
        post = post.map((pos) => {
            if (pos.id === req.params.id) {
                let newComment = {
                    username: req.body.username,
                    id: uuid(),
                    title: req.body.newComment
                }
                pos.comment.push(newComment);
            }
            return pos;
        })
        res.redirect(`/post/comment/${req.params.id}`);
    }
    res.redirect("error");
})
app.get("/createPost", (req, res) => {
    res.render("form");
})
app.post("/createPost/create", (req, res) => {
    let newPost = {
        username: req.body.username,
        id: uuid(),
        image: req.body.url,
        title: req.body.title,
        likes: 0,
        comment: []
    }
    post.unshift(newPost);
    res.redirect("/post");
})
app.delete("/post/delete", (req, res) => {
    post = post.filter((pos) => {
        return pos.id !== req.body.id;
    })
    res.redirect("/post");
})
app.get("*", (req, res) => {
    res.render("error");
})

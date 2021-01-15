const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

//mongoose connection
const mongoose = require("mongoose");
// const { stringify } = require("querystring");
mongoose.connect("mongodb://localhost:27017/post", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Mongo connection is open");
}).catch(err => {
    console.log("Mongodb connection failed");
    console.log(err);
});

//contains the previous array that stored posts
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

//creating a post schema
const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        require: true,
        min: 0
    },
    comment: [{
        username: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }

    }]

})

//ENTERING DEFAULT POST INTO OUR DB-uncomment this section during first run through to add this to database
const Post = mongoose.model("Post", postSchema);
// const first_post = new Post({
//     username: post[0].username,
//     image: post[0].image,
//     title: post[0].title,
//     likes: post[0].likes,
//     comment: post[0].comment
// });
//saving that post into the db
// first_post.save().then(data => {
//     console.log(data);
// }).catch(err => console.log(e));

app.listen(3000, () => {
    console.log("Listening on port 3000");
})
app.get("/", (req, res) => {
    res.render("home");
})
app.get("/post", async (req, res) => {
    try {
        post = await Post.find();
        console.log([...post])
        res.render("post", { post: [...post] });
    }
    catch (e) {
        console.log(e);
        res.redirect("error");

        }
    })
app.patch("/post/like", async (req, res) => {
    // post = post.map((pos) => {
    //     if (pos.id === req.body.id) {
    //         console.log("updating time");
    //         (pos.likes)++;
    //     }
    //     return pos;
    // })
    try {
        post = await Post.findByIdAndUpdate(req.body.id, { $inc: { likes: 1 } }, { useValidors: true, new: true });
        console.log(post);
    res.redirect("/post");
        }
    catch (e) {
        console.log(e);
        res.redirect("error");

    }
})
app.get("/post/comment/:id", async (req, res) => {
    // let index = undefined;
    // for (let i = 0; i < post.length; i++) {
    //     if (req.params.id === post[i].id) {
    //         index = i;
    //         break;
    //     }
    // }
    try {
        let set = await Post.findById(req.params.id);
        if (set === []) {
        res.render("error");
    }
    res.render("comment", { set });
    }
    catch (e) {
        console.log(e);
        res.redirect("error");

    }
})
app.patch("/post/comment/:id/new_comment", async (req, res) => {
    if (req.params.id !== undefined) {
        // post = post.map((pos) => {
        //     if (pos.id === req.params.id) {
        //         let newComment = {
        //             username: req.body.username,
        //             id: uuid(),
        //             title: req.body.newComment
        //         }
        //         pos.comment.push(newComment);
        //     }
        //     return pos;
        // })
        try {
            const { username, newComment } = req.body;
            if (username === undefined) {
                res.redirect("error");
            }
            if (newComment === undefined) {
                res.redirect("error");
            }
            let newComments = {
                username: username,
                    id: uuid(),
                title: newComment
                }
            post = await Post.findByIdAndUpdate(req.params.id, { $set: { comment: newComments } }, { useValidors: true, new: true });
        res.redirect(`/post/comment/${req.params.id}`);
        }
        catch (e) {
            console.log(e);
            res.redirect("error");
        }
    }
    res.redirect("error");
})
app.get("/createPost", (req, res) => {
    res.render("form");
})
app.post("/createPost/create", async (req, res) => {
    try {
        let newPost = new Post({
        username: req.body.username,
        id: uuid(),
        image: req.body.url,
        title: req.body.title,
        likes: 0,
        comment: []
        });
        await newPost.save();
        // post.unshift(newPost);
    res.redirect("/post");
    }
    catch (e) {
        console.log(e);
        res.redirect("error");
    }
})
app.delete("/post/delete", async (req, res) => {
    // post = post.filter((pos) => {
    //     return pos.id !== req.body.id;
    // })
    try {
        await Post.findByIdAndDelete(req.body.id, { useValidors: true });
    res.redirect("/post");
    }
    catch (e) {
        console.log(e);
        res.redirect("error");
    }
})
app.get("*", (req, res) => {
    res.render("error");
})

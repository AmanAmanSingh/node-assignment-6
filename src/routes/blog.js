const router = require('express').Router();
const e = require('express');
let Blog = require('../models/Blog')

// Your routing code goes here


//FETCHING DATA ACCORDING QUERY PARAM
router.get("/blog", (req, res) => {
    // console.log(req.query.search)
    Blog.find({ topic: req.query.search }).then((data) => {
        res.send(data)
    })

})
//CREATING DATA
router.post("/blog", (req, res) => {
    Blog.create({
        topic: req.body.topic,
        description: req.body.description,
        posted_at: req.body.posted_at,
        posted_by: req.body.posted_by
    }).then((user) => {
        res.status(200).send(`${user.topic} created succesfully`)
    })
});

// UPDATAION PART
router.put("/blog/update/:id", async (req, res) => {

    await Blog.updateOne({ _id: req.params.id }, req.body);
    const blogs = await Blog.findOne({ _id: req.params.id });
    res.json({
        status: "succes",
        blogs
    })
})

//DELETION PART
router.delete("/blog/delete/:_id", (req, res) => {
    Blog.deleteOne({ _id: req.params._id }).then((userDel) => {
        res.status(200).send("user deleted succesfully")
    })
})

//GETTING LIST
router.get('/blog/list', async (req, res) => {
    try {
        const { page = 1, search = "" } = req.query;
        var blogs;
        if (search == "") {
            blogs = await Blog.find().skip((page - 1) * 5);
        } else {
            blogs = await Blog.find({ topic: search }).skip((page - 1) * 5).limit(5);
        }

        // Blog = await Blog.find().skip((page - 1) * 5).limit(5);
        res.json({
            status: "ok",
            blogs,
        })
    } catch (e) {
        res.send(`${e.message}`)
    }

    // Blog.find().then((listData) => {
    //     res.status(200).send(`${listData}`);
    // })
    // res.json({ ok: 'blog' })
})

module.exports = router;
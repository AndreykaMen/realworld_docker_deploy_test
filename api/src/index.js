const express = require("express");
const {connectDB} = require("./helpers/db");
const {host, port, db, authApiUrl} = require("./configuration");
const mongoose = require("mongoose");
const axios = require("axios");
const app = express();

const postSchema = new mongoose.Schema({
    name: String
});

const Post = mongoose.model('Post', postSchema);

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port: ${port}`)
        console.log(`On host: ${host}`)
        console.log(`Our database: ${db}`)

        // Post.find(function(err, posts){
        //     if(err) return console.error(err)
        //     console.log('posts', posts)
        // })

        const silence = new Post({name: 'Silence'});
        silence.save(function (err, saveSilence) {
            if (err) return console.error(err)
            console.log('SaveSilence with volumes', saveSilence)
        })
    })
}

app.get('/test', (req, res) => {
    res.send('Our api server is working correctly');
});

app.get("/api/testapidata", (req, res) => {
    res.json({
        testwithapi: true
    })
})

app.get("/testwithcurrentuser", (req, res) => {
    axios.get(authApiUrl + "/currentUser").then(response => {
        res.json({
            testwithcurrentuser: true,
            currentUserFromAuth: response.data
        })
    })
})

connectDB()
    .on('error', console.log)
    .on('disconnected', connectDB)
    .once('open', startServer)
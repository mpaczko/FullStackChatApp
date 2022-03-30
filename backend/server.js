// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';

// app config
const app = express();
const port = process.env.PORT || 9000;

// Pusher
const pusher = new Pusher({
    appId: "1369938",
    key: "eef5420130b643b793aa",
    secret: "40d04ff38147a65b32b7",
    cluster: "eu",
    useTLS: true
});

// middleware
app.use(express.json())

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})

// DB config
const connection_url = 'mongodb+srv://mpaczko:8I1jRjVbu0086cD2@cluster0.6i9or.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Pusher
const db = mongoose.connection

db.once('open', ()=>{
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log("a change occured", change);

        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.user,
                    message: messageDetails.message
                }
            );
        }else {
            console.log("error triggering Pusher")
        }
    })
})

// ???

// api routes
app.get("/",(req,res) => res.status(200).send('hello world'));

app.get("/messages/sync", (req, res) => {
    Messages.find((err,data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    }) 
})

app.post("/messages/new", (req,res) => {
    const dbMessage = req.body
    
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else { 
            res.status(201).send(data)
        }
    });
});

// listener
app.listen(port, () => console.log(`Listening on locaclhost:${port}`));

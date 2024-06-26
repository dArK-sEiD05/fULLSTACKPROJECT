

const functions=require("firebase-functions");
const admin=require('firebase-admin')
require("dotenv").config
const express=require("express");

const app=express();
require("dotenv").config();
app.use(express.json());
const cors=require("cors");
const serviceAccountKey=require("./serviceAccountKey.json");

app.use(cors({origin:true}));
app.use((req,res,next)=>{
    res.set("Access-Control-Allow-Origin","*");
    next();
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
});
app.get("/",(req,res)=>{
    return res.send("hello world");
});

const userRoute=require("./routes/user")
app.use("/api/user",userRoute);

const productRoute=require("./routes/products")
app.use("/api/products",productRoute);


exports.app=functions.https.onRequest(app);

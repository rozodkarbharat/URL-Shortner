const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
var randomstring = require("randomstring");
const urlRoute = require("./route/url.route");
const urlModel = require("./model");
const Validator = require("./middleware/validator");
require("dotenv").config();
const { connection } = require("./db");

app.use(express.json());
app.use(cors());
app.use("/url",urlRoute)

app.get("/",(req,res)=>{
    var str = randomstring.generate(7);
    res.send("Home Page")
})

app.post("/create", async(req, res) => {
    var {short_url,long_url}=req.body
    try{
        const data=new urlModel({short_url,long_url})
        await data.save()
        res.status(200).send({data});
    }
    catch(err){
     res.status(500).send({error:"server error",err})
    }
});


app.listen(process.env.PORT, async() => {
    await connection
  console.log("server running");
});

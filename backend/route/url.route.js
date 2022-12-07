const express=require("express");
const urlModel = require("../model");

const urlRoute=express.Router()
// urlRoute.get("/", (req, res) => {
//   res.send("url page");
// });



urlRoute.get("/:short_url", async (req, res) => {
  var short_url = req.params.short_url;
 
try{
const data = await urlModel.find({short_url});
 console.log(data);
 if(data.length==0){
  res.send("URL does not exist")
 }
  res.redirect(data[0].long_url);
}
  catch(err){
res.status(500).send("Server error")
  }
  // return res.redirect(data.long_url)
}); 

module.exports=urlRoute
var randomstring = require("randomstring");
const urlModel = require("../model");

const Validator = async(req, res, next) => {
    const {short_url}=req.body
    console.log(short_url,5)
    if(short_url==undefined){
        var str = randomstring.generate(7);
        req.body.short_url=str
       next()
    }
    else{
 var data = await urlModel.find({short_url:req.body.short_url})
 if(data.length>0){
   res.status(400).send("short url already exist")
 }
 next()
    }
};

module.exports = Validator;
const mongoose=require("mongoose")

const schema=mongoose.Schema({
    short_url:String,
    long_url:String
})

const urlModel=mongoose.model("url",schema)

module.exports=urlModel
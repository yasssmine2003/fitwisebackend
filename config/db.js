const mongoose=require("mongoose")
module.exports.connecttoMongoDB=async()=>{
    mongoose.set('strictQuery',false);
    mongoose.connect(process.env.urlMongo).then(
        ()=>{
            console.log("connect to db")
        }
    ).catch(
        (error)=>{
            console.log(error)
        }
    )
}
////VNHJzcMJ90Wc7ELB
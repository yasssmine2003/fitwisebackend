
const mongoose = require("mongoose");
const bcrypt=require('bcrypt')

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true,match:[/^\S+@\S+\.\S+$/, 'Please provide a valid email'] },
  password:{type:String,required:true,minlength:6},
  username: String,
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,

  profilPhysique: {
    age: Number,
    poidsKg: Number,
    tailleCm: Number,
    niveau: String,
  },

  profilNutrition: {
    age: Number,
    poidsKg: Number,
    tailleCm: Number,
    objectif: { type: String, enum: ["Perte", "Maintien", "Prise"] },
  },
});
userSchema.pre('save',async function(next) {
    try{
        const salt=await bcrypt.genSalt()
        const User=this
        User.password=await bcrypt.hash(User.password,salt)
        User.status=false


    }catch(error){
        next(error)

    }
    
})
module.exports = mongoose.model("User", userSchema);


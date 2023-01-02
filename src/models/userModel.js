let mongoose = require("mongoose")
let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email:{
    type: String,
    required: true,
    trim: true
  },
  password:{
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    default: "regular"
  },
  previousTotalOrders: {
    type: Number,
    default: 0,
  }, 
},
  { timestamps: true })
module.exports = mongoose.model('User', userSchema)
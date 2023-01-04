const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");

const mongoose = require("mongoose");
const ObjectId=mongoose.Types.ObjectId

const createOrder = async function(req, res) {
  try {
    let orderDetails = req.body;
    let userId = req.params.userId;
    let { product, price } = orderDetails;
    orderDetails.customerId = userId;
    
    if (!ObjectId.isValid(userId)) {
      return res
        .status(400)
        .send({ status: false, msg: "Invalid customer id!" });
    }
    if (!product) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter product name!" });
    }
    if (!price) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter product price!" });
    }
    
    let incrementOrderCount = await userModel.find({ _id: userId })
    
    if(incrementOrderCount.previousTotalOrders>10 && incrementOrderCount.previousTotalOrders<20){
        incrementOrderCount.previousTotalOrders=incrementOrderCount.previousTotalOrders+1
        incrementOrderCount.save()
        orderDetails.discount=10
        let makeOrder = await orderModel.create(orderDetails);
        return res.status(201).send({ status: true, data: makeOrder });
    }
    
    else  if(incrementOrderCount.previousTotalOrders>20 ){
        incrementOrderCount.previousTotalOrders=incrementOrderCount.previousTotalOrders+1
        incrementOrderCount.save()
        orderDetails.discount=20
        let makeOrder = await orderModel.create(orderDetails);
        return res.status(201).send({ status: true, data: makeOrder });
    }
    else{
      incrementOrderCount.previousTotalOrders=incrementOrderCount.previousTotalOrders+1
      incrementOrderCount.save()
      let makeOrder = await orderModel.create(orderDetails);
        return res.status(201).send({ status: true, data: makeOrder });
    }
    
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

const getOrders=async function(req,res){
  try{
    let userId=req.params.userId

if (!ObjectId.isValid(userId)) {
return res
  .status(400)
  .send({ status: false, msg: "Invalid customer id!" });
}

let order=await orderModel.find({customerId:userId})

if(!order){
return res
  .status(400)
  .send({ status: false, msg: "order with this userId not exist" });
}
res.status(200).send({ status: true, message: "Success", data:order });
}
catch (err) {

return res.status(500).send({ status: false, message: err.message })
}
}

module.exports = { createOrder,getOrders };
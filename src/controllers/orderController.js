const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const mongoose = require("mongoose");
const ObjectId=mongoose.Types.ObjectId

const createOrder = async function(req, res) {
  try {
    let orderDetails = req.body;
    let userId = req.params.userId;
    let { product, price } = orderDetails;
    orderDetails.userId = userId;
    if (!userId) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter customer id!" });
    }
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
    
    let incrementOrderCount = await userModel.find({ _id: userId }).lean()
    
    if(incrementOrderCount.previousTotalCount>10 && incrementOrderCount.previousTotalCount<20){
        incrementOrderCount.previousTotalCount=incrementOrderCount.previousTotalCount+1
        orderDetails.discount=10
        let makeOrder = await orderModel.create(orderDetails);
        return res.status(201).send({ status: true, data: makeOrder });
    }
    
    else  if(incrementOrderCount.previousTotalCount>20 ){
        incrementOrderCount.previousTotalCount=incrementOrderCount.previousTotalCount+1
        orderDetails.discount=20
        let makeOrder = await orderModel.create(orderDetails);
        return res.status(201).send({ status: true, data: makeOrder });
    }

    
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { createOrder };
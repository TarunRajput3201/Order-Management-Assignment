let jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const {

  validateObjectId

} = require("../validator/validation");


const authenticate = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide token in header" });
    }


    jwt.verify(token, "functionup-radon", (err, user) => {
      if (err)

        return res.status(401).send({ status: false, message: "please provide valid token" });
      req.user = user
      let tokenTime = req.user.exp;
      let createdTime = Date.now()

      if (createdTime > tokenTime) {
          return res.status(400).send({ status: false, msg: "token is expired, login again" })
      }
      next();
    });

  } catch (err) {
    res.status(500).send({
      status: false,
      messsage: err.message,
    });
  }
};

const authorise = async function (req, res, next) {
  try {
    let { userId } = req.params;
    if (!userId) { return res.status(400).send({ status: false, message: "please provide userId" }) }

    if (!validateObjectId(userId)) {
      return res.status(400).send({ status: false, message: "Invalid userId" })
    }
    let checkData = await userModel.findOne({ _id: userId });
    if (!checkData) {
      return res.status(404).send({ status: false, message: "Invalid userId" });
    }

    if (checkData._id != req.user.userId) {
      return res
        .status(403)
        .send({ status: false, message: "Authorization failed." });
    }

   
    next();
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: err.message });
  }
};
module.exports = { authenticate, authorise};

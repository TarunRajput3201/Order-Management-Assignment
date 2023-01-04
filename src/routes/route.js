let express = require("express")
let router = express.Router()
let { createUser, userLogin,getUser } = require("../controllers/userController")
let {createOrder,getOrders}=require("../controllers/orderController")
let { authenticate, authorise} = require("../middleware/auth")


router.post("/register", createUser)
router.post("/login", userLogin)
router.get("/getUser/:userId",getUser)

router.post("/createOrder/:userId",authenticate,authorise,createOrder)
router.get("/getOrders/:userId",authenticate,authorise,getOrders)

module.exports = router;
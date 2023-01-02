let express = require("express")
let router = express.Router()
let { createUser, userLogin } = require("../controllers/userController")
let {createOrder}=require("../controllers/orderController")
let { authenticate, authorise} = require("../middleware/auth")


router.post("/register", createUser)
router.post("/login", userLogin)

router.post("/createOrder/:userId",authenticate,authorise,createOrder)

module.exports = router;
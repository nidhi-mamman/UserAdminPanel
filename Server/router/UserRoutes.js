const express=require('express')
const {createUser,loginUser,getUser}=require("../controllers/User")
const{checkEmailExists}=require("../controllers/EmailChecker")
const authMiddleware=require("../middlewares/authMiddleware")

const router=express.Router()

router.post('/post',createUser)
router.post('/signin',loginUser)
router.get('/user',authMiddleware,getUser)
router.post("/check-email",checkEmailExists)

module.exports=router
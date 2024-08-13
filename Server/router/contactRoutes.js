const express=require("express")

const {contactResponse}=require("../controllers/contactForm")

const router=express.Router()

router.post("/contact",contactResponse)

module.exports=router


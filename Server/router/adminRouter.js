const express=require('express')
const {getAllUsers,getAllContacts,deleteUserById,getUserById,getUpdatedUser,deleteContactById,getUserCount,getContactCount}=require('../controllers/adminController')
const authMiddleware=require('../middlewares/authMiddleware')
const adminMiddleware=require("../middlewares/adminMiddleware")

const router=express.Router()

router.get('/users',authMiddleware,adminMiddleware,getAllUsers)
router.get('/user-count',authMiddleware,adminMiddleware,getUserCount)
router.get('/contacts',authMiddleware,adminMiddleware,getAllContacts)
router.get('/contact-count',authMiddleware,adminMiddleware,getContactCount)
router.delete('/users/delete/:id',authMiddleware,adminMiddleware,deleteUserById)
router.get('/user/:id',authMiddleware,adminMiddleware,getUserById)
router.patch('/user/update/:id',authMiddleware,adminMiddleware,getUpdatedUser)
router.delete('/contact/delete/:id',authMiddleware,adminMiddleware,deleteContactById)

module.exports=router
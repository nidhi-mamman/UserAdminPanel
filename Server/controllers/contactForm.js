const Contact=require('../model/contactForm')

//TO SUBMIT CONTACT FORM
const contactResponse=async(req,res)=>{
    try {
        const {firstName,email,message}=req.body;

        await Contact.create({firstName,email,message})

        return res.status(200).json("Response sent successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports={contactResponse}

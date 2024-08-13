const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    cpassword: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})


//we can also use pre method for hashing the password automatically when a user document is saved

//json web token
userSchema.methods.generatetoken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(), //payload to authenticate the user
            email: this.email,
            isAdmin: this.isAdmin,
        },
            process.env.SECRET_KEY, //secret_key or signature
            {
                expiresIn: "99999d",
            }
        )
    } catch (error) {
        console.log(error)
    }
}

module.exports = new mongoose.model("User", userSchema)
// i have already included the auth token code this token code is just as other way
const crypto=require("crypto")

const secret_key=crypto.randomBytes(32).toString('hex')

module.exports={
    SECRET_KEY:secret_key
}
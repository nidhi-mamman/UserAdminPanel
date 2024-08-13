const User = require("../model/User");

//TO CHECK IF EMAIL ALREADY EXISTS (I have specially created this for frontned use)
const checkEmailExists = async (req, res) => {
  try {
    const email = req.body.email;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {checkEmailExists};

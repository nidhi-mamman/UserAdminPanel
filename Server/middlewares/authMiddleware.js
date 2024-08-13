const jwt = require("jsonwebtoken");
const User = require("../model/User");

//TO CHECK TOKEN IS VALID OR NOT
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Unauthorised HTTP,token not provided" });
  }

  const jwtToken = token.replace("Bearer", " ").trim();

  console.log("Token is ", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log(userData);
    req.user = userData;
    req.token = token;
    req.userId = userData._id;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized,Invalid token" });
  }
};

module.exports = authMiddleware;

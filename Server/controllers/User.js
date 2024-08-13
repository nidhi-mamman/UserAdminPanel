const User = require("../model/User");
const bcrypt = require("bcryptjs");

//TO POST USER DATA
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, cpassword } = req.body;

    //Email validation regex
    const emailPattern = /^[a-zA-Z0-9._]+@(gmail\.com|yahoo\.com)$/;

    // Password validation regex
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!firstName || !lastName || !email || !password || !cpassword) {
      return res.status(400).json("Please enter all the fields"); // Return to prevent further execution
    }

    if (!emailPattern.test(email)) {
      return res.status(400).json("Please enter a valid email address"); // Return to prevent further execution
    }

    if (!passwordPattern.test(password)) {
      return res
        .status(400)
        .json(
          "Password must be at least 8 characters long and include at least one number, one uppercase letter, one lowercase letter, and one special character"
        );
    }

    if (password !== cpassword) {
      return res.status(400).json("Password does not match"); // Return to prevent further execution
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json("User already exists"); // Return if user exists
    }

    const encPassword = await bcrypt.hash(password, 10);

    // Create new user

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: encPassword,
      cpassword: encPassword,
    });

    res.status(201).json({
      msg: "Signed up successfully",
      token: await user.generatetoken(),
      userId: user._id.toString(),
    }); // Send user data and set status code for creation
  } catch (error) {
    res.status(500).json("Internal server error"); // Send error message with status code
  }
};

//TO CHECK IF LOGGED USER EXISTS OR NOT

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(401).json({ msg: "Invalid email or password" }); // Use 401 for authentication failures
    }

    // Check if the password is correct
    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    if (isPasswordMatch) {
      // Check if the specific credentials should be an admin
      if (email === "nidhimamman3@gmail.com" && password === "Nidhi@100703") {
        userExist.isAdmin = true;
        await userExist.save(); // Save the user with isAdmin set to true
      }

      const token = await userExist.generatetoken();
      return res.status(200).json({
        msg: "Signed in successfully",
        token: token,
        userId: userExist._id.toString(),
        isAdmin: userExist.isAdmin, // Include isAdmin status in the response
      });
    } else {
      return res.status(401).json({ msg: "Invalid email or password" }); // Use 401 for authentication failures
    }
  } catch (error) {
    console.error("Error during login:", error); // Log the error
    return res.status(500).json({ msg: "Internal server error" }); // Respond with a generic server error
  }
};

//TO ACCESS LOGGED USER'S DATA
const getUser = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser, loginUser, getUser };

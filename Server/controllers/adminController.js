const User = require("../model/User");
const mongodb = require("mongodb");
const Contact = require("../model/contactForm");

//TO GET ALL USERS DATA
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, cpassword: 0 });

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No User Found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//TO GET COUNT OF USERS
const getUserCount=async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user count' });
  }
};

//TO GET ALL CONTACT FORM DATA
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ msg: "No Contact Found" });
    }

    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

//TO GET COUNT OF CONTACTS
const getContactCount=async (req, res) => {
  try {
    const count = await Contact.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact count' });
  }
};

//TO GET A SINGLE USER
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

//TO UPDATE AN USER
const getUpdatedUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;
    const updateData = await User.updateOne(
      { _id: id },
      {
        $set: updatedUser,
      }
    );

    return res.status(200).json(updateData);
  } catch (error) {
    next(error);
  }
};

//TO DELETE AN USER
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

//TO DELETE A CONTACT
const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  getUpdatedUser,
  deleteContactById,
  getUserCount,
  getContactCount
};

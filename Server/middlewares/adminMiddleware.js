const adminMiddleware = async (req, res, next) => {
  try {
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      return res
        .status(404)
        .json({ msg: "Access denied.User is not an admin" });
    }
    // return res.status(200).json({ msg: req.user });
    next()
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;

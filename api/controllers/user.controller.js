export const logOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.json({ success: true, message: "User Log out Successful" });
  } catch (error) {
    next(error);
  }
};

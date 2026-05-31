import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access!" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!user) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return res.status(401).json({ message: "Token Expired or Invalid, Unauthorized Access!" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error while Auth Middleware\nError: ", error);

    // Check if the error is due to an expired token
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return res.status(401).json({ message: "Session Expired. Please log in again." });
    }

    return res.status(500).json({ message: "Internal Server Error, Unauthorized Access!" });
  }
};

export default AuthMiddleware;

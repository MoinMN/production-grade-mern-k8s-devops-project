import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const Login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: "All Fields Required!" });
  try {
    const user = await User.findOne({ username: username });
    if (!user) return res.status(401).json({ message: "Username not exists!" });

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) return res.status(401).json({ message: "Invalid Creadentials!" });

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,     // Prevent access from JavaScript
      secure: true,       // Use this flag when using HTTPS
      sameSite: 'None'  // CSRF protection
    });

    return res.status(200).json({ user: user, message: "Logged In Successfully!" });
  } catch (error) {
    console.log('error while login => ', error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const Verify = async (req, res) => {
  try {
    const token = req.cookies.token;
    // console.log("Token =>", token);
    if (!token) return res.status(401).json({ isAuthenticated: false, message: "Token Not Found!" });

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!user) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return res.status(401).json({ isAuthenticated: false, message: "Token Expired or Invalid, Unauthorized Access!" });
    }

    return res.status(200).json({ isAuthenticated: true, user: user });
  } catch (error) {
    // Check if the error is due to an expired token
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return res.status(401).json({ isAuthenticated: false, message: "Session Expired. Please log in again." });
    }

    console.log(`Error while verifing user\nError => `, error.message);

    return res.status(500).json({ isAuthenticated: false, message: "Internal Server Error!", error: error.message });
  }
}

export const Logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true,    // Matches the same settings used during login
      secure: true,      // Ensure the flag is consistent with login settings
      sameSite: 'None' // Matches the same settings used during login
    });

    return res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    console.log('Error while logging out =>', error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
};

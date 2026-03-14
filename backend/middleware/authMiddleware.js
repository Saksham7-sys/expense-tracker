//this file is created for checking jwt tokens send by user. if it is correct then go ahead if not then request denied
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  try {

    // 1️⃣ get token from request header
    const token = req.header("Authorization");

    // 2️⃣ if token not present
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token." });
    }

    // 3️⃣ verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ attach user info to request
    req.user = verified;

    // 5️⃣ continue to next function
    next();

  } catch (error) {

    res.status(400).json({ message: "Invalid Token" });

  }

};

module.exports = authMiddleware;
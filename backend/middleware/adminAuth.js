import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ message: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized: Admin access required." });
    }
    req.admin = verified; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default adminAuth;

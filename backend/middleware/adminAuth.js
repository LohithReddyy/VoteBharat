import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(403).json({ message: "Access Denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"

  if (!token) {
    return res.status(403).json({ message: "Access Denied. Token missing." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    if (verified.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized: Admin access required." });
    }

    req.admin = verified; 
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default adminAuth;

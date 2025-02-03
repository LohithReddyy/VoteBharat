import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") return res.status(403).json({ message: "Access denied. Admins only." });
        
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};

export default adminAuth;

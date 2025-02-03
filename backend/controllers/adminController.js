import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
    const { aadharNumber, password } = req.body;

    if (aadharNumber === "789456123321" && password === "Lohith@123") {
        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ message: "Admin login successful", token });
    } else {
        res.status(401).json({ message: "Invalid admin credentials" });
    }
};

import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';


//Create jwt token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
}

// Signup
export const signup = async (req, res) => {
    try {
        //deestructuring 
        const { name, aadharNumber, age, gender, password, confirmPassword } = req.body;

        //check if aadhar already exists
        let userExists = await User.findOne({ aadharNumber });
        if (userExists) {
            return res.status(400).json({ message: 'Aadhar Number already registered' });
        }
        //validation 
        if (!validator.isNumeric(aadharNumber)) {
            return res.status(400).json({ message: 'Aadhar Number should be a number' });
        }
        if (!validator.isLength(aadharNumber, { min: 12, max: 12 })) {
            return res.status(400).json({ message: 'Aadhar Number should be 12 digits' });
        }
        //name should contain only alphabets but space is allowed
        if (!validator.isAlpha(name.replace(/ /g, ''))) {
            return res.status(400).json({ message: 'Name should contain only alphabets' });
        }
        //age should be >18
        if (age < 18) {
            return res.status(400).json({ message: 'Age should be greater than 18' });
        }
        if (!validator.isInt(age.toString())) {
            return res.status(400).json({ message: 'Age should be a number' });
        }
        
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: 'Password should contain atleast 6 characters and one capital one number and one special character' });
        }
        
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        if (!name || !aadharNumber || !age || !gender || !password || !confirmPassword) {
            return res.status(400).json({ succces:false,message: 'All fields are required' });
        }

        //hashing the pass before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

      
       //save the user
        const user = new User({ name:name, aadharNumber:aadharNumber, age:age, gender:gender, password: hashedPass });

        const newuser = await user.save();
        const token = generateToken(newuser._id);
        res.status(201).json({ message: 'User registered successfully', token });

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

// Signin
export const signin = async (req, res) => {
    try {
        const { aadharNumber, password } = req.body;
        //check if both fields are provided
        if (!aadharNumber || !password) {
            return res.status(400).json({ message: 'Please provide both aadhar and password' });
        }
        //check if aadhar exists
        const user = await User.findOne({ aadharNumber });
        if (!user) {
            return res.status(400).json({ message: 'Aadhar Number not registered' });
        }
        //check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        //generate token
        const token = generateToken(user._id);
        res.status(200).json({ message: 'Login successful', token });
    } 
       
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const getUserDetails = async (req, res) => {
  try {
    const { aadharNumber } = req.body;

    if (!aadharNumber) {
      return res.status(400).json({ message: "Aadhar number is required" });
    }

    const user = await User.findOne({ aadharNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      name: user.name,
      aadharNumber: user.aadharNumber,
      hasVoted: user.hasVoted,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

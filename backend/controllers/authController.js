import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

<<<<<<< HEAD

// Signup User
export const signupUser = async (req, res) => {

=======
// Signup User
export const signupUser = async (req, res) => {
  console.log("Signup Hit");
>>>>>>> 4e0ef5fbcb6c68ca2c2682cd8ddff44b4d41807a
  try {
    const { name, email, password, username } = req.body;

    // Check If fields are filled or empty
    if (
      [name, username, email, password].some(
        (field) => !field || field.trim() === "",
      )
    ) {
      return res.status(400).json({ message: "All Fields Required" });
    }

    // check if user already exist or note
    const userExist = await User.findOne({ $or: [{ email }, { username }] });
    if (userExist) {
      return res.status(409).json({ message: "User already Exist" });
    }

    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    // create user
    await User.create({
      name,
      username,
      email,
      password: hashPassword,
    });
    res.json({ message: "User registered successfully " });
  } catch (error) {
    res.status(500).json({ message: error.message || "Serer Error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
<<<<<<< HEAD
  

  try {
    const { identifier,  password } = req.body;

    if (!identifier || !password) {
=======
  console.log("Login Hit");
  try {
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
>>>>>>> 4e0ef5fbcb6c68ca2c2682cd8ddff44b4d41807a
  return res.status(400).json({
    message: "Email/Username and password are required",
  });
}

    const user = await User.findOne({
<<<<<<< HEAD
      $or: [{ username: identifier }, { email: identifier }],
=======
      $or: [{ username }, { email }],
>>>>>>> 4e0ef5fbcb6c68ca2c2682cd8ddff44b4d41807a
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Compare password
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(404).json({ message: "invalid Password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
       process.env.JWT_SECRET, {
      expiresIn: "1d",
    }
  );
    return res.status(200).json({
      message: "Login SuccessFul",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

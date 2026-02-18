import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signupUser = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    // Check If fields are filled or empty 
    if (
        [name, username, email, password].some((field)=> !field || field.trim() ==='' )
    ) {
        return res.status(400).json({message:'All Fields Required'})
    }


    // check if user already exist or note
    const userExist = await User.findOne({ $or: [{ email }, { username }] });
    if (userExist) {
        return res.status(409).json({message: 'User already Exist'})
    }


    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10)


    // create user
    await User.create({
        name, 
        username,
        email,
        password: hashPassword
    })
    res.json({message: 'User registered successfully '})

  } catch (error) {
    res.status(500).json({message: error.message || 'Serer Error'})
  }
};

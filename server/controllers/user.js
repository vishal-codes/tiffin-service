import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import Tiffin from '../models/Tiffin.js';
import tryCatch from '../utils/tryCatch.js';

export const register = tryCatch(async (req, res) => {
    const { name, email, password } = req.body;
    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Password must be of 6 characters or more!',
        });
    }
    const emailLowerCase = email.toLowerCase();
    const existingUser = await User.findOne({ email: emailLowerCase });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: 'User already exists!',
        });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
        name,
        email: emailLowerCase,
        password: hashedPassword,
    });
    const { _id: id, photoURL } = user;
    const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.status(201).json({
        success: true,
        result: {
            id,
            name,
            email: user.email,
            photoURL,
            token,
        },
    });
});

export const logIn = tryCatch(async (req, res) => {
    const { email, password } = req.body;
    const emailLowerCase = email.toLowerCase();
    const existingUser = await User.findOne({ email: emailLowerCase });
    if (!existingUser) {
        return res.status(404).json({
            success: false,
            message: "User doesn't exist!",
        });
    }
    const correctPassword = await bcrypt.compare(
        password,
        existingUser.password
    );
    if (!correctPassword) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Credentials!',
        });
    }
    const { _id: id, name, photoURL } = existingUser;
    const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.status(200).json({
        success: true,
        result: {
            id,
            name,
            email: emailLowerCase,
            photoURL,
            token,
        },
    });
});

export const updateProfile = tryCatch(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
        //https://mongoosejs.com/docs/tutorials/findoneandupdate.html#getting-started
        new: true,
    });
    const { _id: id, name, photoURL } = updatedUser;

    await Tiffin.updateMany({ uid: id }, { uName: name, uPhoto: photoURL });

    const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.status(200).json({
        success: true,
        result: { name, photoURL, token },
    });
});

export const deleteUser = tryCatch(async (req, res) => {
    console.log(req.user);
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({
        success: true,
        result: 'User deleted successfully!',
    });
});

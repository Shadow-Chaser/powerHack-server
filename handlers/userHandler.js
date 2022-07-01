const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registration
router.post("/registration", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({
            message: "Registration successful!",
        });
    } catch {
        res.status(500).json({
            message: "Registration failed!",
        });
    }
});


// login

router.post("/login", async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        console.log(user);
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

            if (isValidPassword) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id,
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });

                res.status(200).json({
                    "access_token": token,
                    "message": "Login successful!"
                });
            } else {
                res.status(401).json({
                    "error": "Authentication failed!"
                });
            }
        } else {
            res.status(401).json({
                "error": "Authentication failed!"
            });
        }
    } catch {
        res.status(401).json({
            "error": "Authetication failed!"
        });
    }
});


module.exports = router;
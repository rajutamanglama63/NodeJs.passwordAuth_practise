const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/User");

// Login Page
router.get("/login", (req, res) => {
    res.render("login");
})

// Register Page
router.get("/register", (req, res) => {
    res.render("register");
})

// Register Handle
router.post("/register", async(req, res) => {
    try {
        const { name, email, password, conform_password } = req.body;
        // validation
        if (!name || !email || !password || !conform_password) {
            return res.status(400).json({msg:"All field required."});
        }
        if (password.length < 5) {
            return res.status(400).json({msg:"Password needs to be atleast 5 character long."});
        }
        if (password !== conform_password) {
            return res.status(400).json({msg:"Enter the same password for varification."});
        }

        const existingUser = await User.findOne({email : email});
        if (existingUser) {
            return res.status(400).json({msg:"An account with this email already exist."});
        }
        if (!name) {
            name = email;
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: passwordHash,
            conform_password
        });

        const savedUser = await newUser.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
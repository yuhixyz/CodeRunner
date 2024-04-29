const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

userRouter.get('/', async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

userRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        passwordHash
    });

    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isUserExist = user == null
        ? false
        : await bcrypt.compare(password, user.passwordHash);

    if (!isUserExist) {
        res.status(401).json({
            error: 'user not exist'
        });
        return;
    }

    const secretKey = process.env.SECRET;

    const payload = {
        username: username,
        id: user._id
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '7d' });

    res.status(200).send({ username, token });
});

module.exports = userRouter;
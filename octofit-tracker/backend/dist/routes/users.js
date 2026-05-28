"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const users = await User_1.User.find().limit(50);
    res.json(users);
});
router.post('/', async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = new User_1.User({ username, email });
        await user.save();
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.default = router;

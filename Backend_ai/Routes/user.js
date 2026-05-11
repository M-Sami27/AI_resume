const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/user");

// REGISTER
router.post("/register", UserController.register);

// LOGIN
router.post("/login", UserController.login);

module.exports = router;
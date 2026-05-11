const fs = require("fs");
const path = require("path");

const usersPath = path.join(
    __dirname,
    "../data/users.json"
);


// REGISTER
exports.register = (req, res) => {

    try {

        const { name, email, password } = req.body;

        const users = JSON.parse(
            fs.readFileSync(usersPath, "utf-8")
        );

        const existingUser = users.find(
            (u) => u.email === email
        );

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            role: "user"
        };

        users.push(newUser);

        fs.writeFileSync(
            usersPath,
            JSON.stringify(users, null, 2)
        );

        res.json({
            message: "Registered successfully",
            user: newUser
        });

    } catch (err) {

        res.status(500).json({
            message: "Register failed",
            error: err.message
        });

    }
};


// LOGIN
exports.login = (req, res) => {

    try {

        const { email, password } = req.body;

        // ADMIN LOGIN
        if (
            email === "admin@gmail.com" &&
            password === "admin123"
        ) {

            return res.json({
                message: "Admin login successful",
                user: {
                    name: "Admin",
                    email,
                    role: "admin"
                }
            });
        }

        const users = JSON.parse(
            fs.readFileSync(usersPath, "utf-8")
        );

        const user = users.find(
            (u) =>
                u.email === email &&
                u.password === password
        );

        if (!user) {

            return res.status(401).json({
                message: "Invalid credentials"
            });

        }

        res.json({
            message: "Login successful",
            user
        });

    } catch (err) {

        res.status(500).json({
            message: "Login failed",
            error: err.message
        });

    }
};

require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const readline = require("readline");

const connectDB = require("../config/db");
const User = require("../models/user");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (question) => {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
};

const createAdmin = async () => {
    try {
        console.log("\n=== Create Admin Account ===\n");

        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from your .env file");
        }

        const name = (await ask("Admin name: ")).trim();
        const email = (await ask("Admin email: ")).trim().toLowerCase();
        const phone = (await ask("Admin phone (optional): ")).trim();
        const password = await ask("Admin password (minimum 8 characters): ");

        if (!name || name.length < 2) {
            throw new Error("Name must contain at least 2 characters");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error("Please enter a valid email address");
        }

        if (password.length < 8) {
            throw new Error("Password must contain at least 8 characters");
        }

        await connectDB();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("An account with this email already exists. No changes made.");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const admin = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role: "Admin"
        });

        console.log("\nAdmin account created successfully!");
        console.log("Admin ID:", admin._id);
        console.log("Name:", admin.name);
        console.log("Email:", admin.email);
        console.log("Role:", admin.role);

    } catch (error) {
        console.error("\nAdmin creation failed:", error.message);
        process.exitCode = 1;
    } finally {
        rl.close();
        await mongoose.disconnect();
        console.log("\nDatabase connection closed.");
    }
};

createAdmin();

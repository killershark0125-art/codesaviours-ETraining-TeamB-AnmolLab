
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const responseHandler = require("../utils/responseHandler");
const {StatusCodes} = require("../consts/statusCode")



const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
};

const comparePassword = async (enteredPassword, storedPassword) => {
    return bcrypt.compare(enteredPassword, storedPassword);
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

       if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !password
) {
            return responseHandler(res,StatusCodes.INVALID_DATA,"Name, email and password are required");
        }

        if (name.trim().length < 2) {
            return responseHandler(res, StatusCodes.INVALID_DATA, "Name must be at least 2 characters");
        }

        if (password.length < 8) {
            return responseHandler(res, StatusCodes.INVALID_DATA, "Password must be at least 8 characters");
        }

        const normalizedEmail = email.trim().toLowerCase();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(normalizedEmail)) {
            return responseHandler(res, StatusCodes.INVALID_DATA, "Please provide a valid email address");
        }

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return responseHandler(res, StatusCodes.CONFLICT, "Email is already registered");
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            phone,
            role: "Patient"
        });

        return responseHandler(res, StatusCodes.SUCCESS, "Registration successful", {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Registration error:", error.message);
        return responseHandler(res, StatusCodes.SERVER_ERROR, "Server error during registration");
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
)  {
        return responseHandler(res,StatusCodes.INVALID_DATA,"email and password are required");
;
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
        }).select("+password");

        if (!user) {
            return responseHandler(res, StatusCodes.UNAUTHORIZED, "Invalid email or password");
        }

        if (!user.isActive) {
            return responseHandler(res, StatusCodes.FORBIDDEN, "Your account is inactive");
        }

        const isPasswordCorrect = await comparePassword(password,user.password );

        if (!isPasswordCorrect) {
            return responseHandler(res, StatusCodes.UNAUTHORIZED, "Invalid email or password");
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not configured");
            return responseHandler(res, StatusCodes.SERVER_ERROR, "Authentication configuration error");
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return responseHandler(res, StatusCodes.SUCCESS, "Login successful", {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);

        return responseHandler(res, StatusCodes.SERVER_ERROR, "Server error during login");
    }
};

const getCurrentUser = async (req, res) => {
    return responseHandler(res, StatusCodes.SUCCESS, "User retrieved successfully", {
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone,
            role: req.user.role
        }
    });
};



        module.exports = {registerUser,loginUser,getCurrentUser};

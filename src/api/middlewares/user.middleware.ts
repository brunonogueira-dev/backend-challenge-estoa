import { body } from "express-validator";
import User from "../../db/models/User";

export const checkEmailUnique = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    if (user) {
        return Promise.reject("Email already exists");
    }
    return Promise.resolve();
};

export const createUserValidationMiddleware = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .custom(checkEmailUnique),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];

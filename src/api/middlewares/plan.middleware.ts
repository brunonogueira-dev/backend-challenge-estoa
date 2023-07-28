import { body } from "express-validator";

export const createPlanValidationMiddleware = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isNumeric().withMessage("Price must be a numeric value"),
    body("expiresIn")
        .isNumeric()
        .withMessage("Expiration period must be a numeric value"),
];

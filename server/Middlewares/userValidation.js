const { body, validationResult } = require("express-validator");

// Middleware to validate user registration
const validateUserRegister = [
  body("email").isEmail().normalizeEmail().withMessage("email should be valid"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("password should be at minimum 5 characters"),
  body("name")
    .isLength({ min: 3 })
    .withMessage("name should be at minimum 3 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = { validateUserRegister };

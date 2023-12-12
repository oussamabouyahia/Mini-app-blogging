const { body, validationResult } = require("express-validator");

// Middleware to validate user registration
const validatePost = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("title required with minimum 03 characters"),
  body("content")
    .isLength({ min: 10 })
    .withMessage("content required and  should be at minimum 10 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = { validatePost };

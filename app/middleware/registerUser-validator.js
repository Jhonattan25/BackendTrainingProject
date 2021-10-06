const { check, validationResult } = require("express-validator");

validatorParams = [
  check("identificationNumber").isLength({ min: 8, max: 10 }),
  check("fullName").isLength({ min: 1 }),
  check("email").isEmail(),
  check("password").isLength({ min: 8, max: 15 }),
  check("cityCode").isLength({ min: 5, max: 6 }),
];

function validator(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}

module.exports = {
  validatorParams,
  validator,
};
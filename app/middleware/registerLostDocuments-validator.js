const { check, validationResult } = require('express-validator');

validatorParams = [
    check('numDocumento').isLength({ min: 8, max: 10}),
    check('nombreCompleto').isLength({ min:1}),
    check('email').isEmail(),
    check('descripcion').isLength({ max:100}),
    check('fecha').isDate(),
    check('estado').isBoolean(),
    check('perdido').isBoolean(),
    check('cedulaFuncionario').isLength({ min: 8, max:10}),
    check('idCiudad').isLength({ min: 5, max:6}),
  ];
  function validator(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validatorParams,
    validator
  }
  
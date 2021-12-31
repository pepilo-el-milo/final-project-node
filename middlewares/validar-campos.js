const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({
            errors:{
                body: [
                  "can't be empty"
                ]
              }
        });
    }
    next();
};

module.exports = {
    validarCampos
};
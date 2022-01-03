const { validationResult } = require("express-validator");

/**
 * Validate if there are no errors regarding the fields comming from the last middlewares.
 * @function
 * @param {Request} req 
 * @param {Response} res 
 * @param {Callback} next 
 * @returns {any}
 */
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
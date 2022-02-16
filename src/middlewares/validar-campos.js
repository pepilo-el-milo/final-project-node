const { validationResult } = require("express-validator");
const logger = require("../helpers/logger");

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
    const msgs = {};
    errors.array().forEach((err) => {
        const params = err.msg.split("-");
        msgs[params[0]] = params[1];
    });
    if (!errors.isEmpty()){
        logger.warn(JSON.stringify(msgs));
        return res.status(422).json({
            errors:msgs
        });
    }
    next();
};

module.exports = {
    validarCampos
};
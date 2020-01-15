const logger = require('../logger/logger');

const statusCodes = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404
};

// Returns a custom error status code with custom message 
exports.handle = (error, req, res, next) => {
    res.status(statusCodes[error.errorCode] || statusCodes["DEFAULT_ERROR"])
    console.log(error.stack);
    logger.error(error);
    return res.send({
        message: error.message,
        internal_code: error.errorCode
    });
};
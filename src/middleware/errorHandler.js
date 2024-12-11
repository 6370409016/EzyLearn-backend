const { constants } = require('../config/errorConstant');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : constants.SERVER_ERROR;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: 'Validation Error',
                status: err.status,
                message: err.message,
                stackTrace: err.stack
            });

            break;

        case constants.UNAUTHORIZED:
            res.json({
                title: 'Unauthorized',
                status: err.status,
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case constants.FORBIDDEN:
            res.json({
                title: 'Forbidden',
                status: err.status,
                message: err.message,
                stackTrace: err.stack
            });

            break;

        case constants.NOT_FOUND:
            res.json({
                title: 'Not found',
                status: err.status,
                message: err.message,
                stackTrace: err.stack
            });

            break;

        case constants.CONFLICT:
            res.json({
                title: 'Conflict',
                status: err.status,
                message: err.message,
                stackTrace: err.stack
            });

            break;

        case constants.SERVER_ERROR:
            res.json({
                title: 'Server Error',
                status: err.status,
                message: err.message,
                stackTrace: err.stack
            });

        default:
            res.json({
                title: 'New Error',
                status: err.status,
                message: err.message,
                stackTrace: err.stack
            })

            break;

    }

    // next()
}

module.exports = errorHandler;


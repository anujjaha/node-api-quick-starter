import logger from "@util/logger";
import { logging } from "@config";

module.exports = (error, req, res, next) => {
    const errorResponse = {
        status: 0,
        status_code: 500,
        message: ["Internal server error"],
        data: null,
        errors: null,
    };

    logger.error(error);

    // response database error only if logging is true otherwise show internal server error
    if (logging === true) {
        // if error thrown from sequelize
        // when seqquelize can not connect to database
        if (error.name === "SequelizeConnectionRefusedError") {
            errorResponse.message = ["Database connection refused"];
            return res.status(errorResponse.status_code).send(errorResponse);
        }
    }

    // if error thrown from jwt validation check
    if (error.name === "UnauthorizedError") {
        return res.send({
            status: false,
            error: ["Invalid token"],
            message: "Invalid token",
            code: 200,
            errorCode: 401
        });
    }

    // if error thrown by user defined error
    if (error.name === "GeneralError") {
        return res.send({
            status: false,
            error: [error.error_message],
            message: error.error_message,
            code: 200,
            errorCode: error.error_code
        });
    }

    return res.status(errorResponse.status_code).send(errorResponse);
};
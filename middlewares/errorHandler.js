function errorHandler(error, req, res, next) {
    console.log(error);
    let statusCode, message
    switch (error.name) {
        case "SequelizeValidationError":
            statusCode = 400
            message = error.errors[0].message
            break;

        case "NotFound":
            statusCode = 404
            message = error.message ?? "Data Not Found"
            break;

        default:
            statusCode = 500;
            message = "Internal Error Server"
            break;
    }
    res.status(statusCode).json({ message })
}

module.exports = errorHandler
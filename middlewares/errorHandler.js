function errorHandler(error, req, res, next) {
    console.log(error);
    let statusCode, message
    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            statusCode = 400
            // message = error.errors[0].message;
            message = error.errors[0]?.message || "Email already exists";
            break;

        case "Email is missing":
            statusCode = 400
            message = "Email is missing";
            break;

        case "Password is missing":
            statusCode = 400
            message = "Password is missing";
            break;

        case "Invalid email/password":
            statusCode = 401
            message = "Invalid email/password";
            break;

        case "Unauthenticated":
        case "JsonWebTokenError":
            statusCode = 401
            message = "Unauthenticated";
            break;

        case "Forbidden Error":
            statusCode = 403
            message = "Forbidden Error";
            break;

        case "AdminOnly":
            statusCode = 403
            message = "Only admin can add staff";
            break;

        case "NotFound":
            statusCode = 404
            message = error.message ?? "Data Not Found";
            break;

        default:
            statusCode = 500;
            message = "Internal Error Server";
            break;
    }
    res.status(statusCode).json({ message })
}

module.exports = errorHandler
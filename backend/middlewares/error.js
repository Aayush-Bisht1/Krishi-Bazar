class errorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
     
    if(err.name === "JsonWebTokenError") {
        const message = "Json Web Token is invalid, Try again.";
        err = new errorHandler(message, 400);
    }
    if(err.name === "TokenExpiredError") {
        const message = "Json Web Token is expired, Try again.";
        err = new errorHandler(message, 400);
    }
    if(err.name === "CastError") {
        const message = `Invalid ${err.path}: ${err.value}`;
        err = new errorHandler(message, 400);
    }

    const errorMessage = err.errors 
        ? Object.values(err.errors).map((item) => item.message).join(" ")
        : err.message;

    res.status(err.statusCode).json({
        success: false,
        message: errorMessage
    })
}

export default errorHandler;
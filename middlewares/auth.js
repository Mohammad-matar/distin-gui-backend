const jwt = require('jsonwebtoken')
const createError = require("http-errors");

exports.authenticated = async (req, res, next) => {
    // get the token from request header
    let token = req.header("Authorization");

    // error if token is not found
    if (!token) {
        res.status(401).json(createError(401, "No token found, login to access"));
    }

    try {
        // verify the token by JWT and JWT secret
        let user = await jwt.verify(token, process.env.JWT_SECRET);

        // get the user data from the decoded token
        req.user = user;

        // continue to next step
        next();
    } catch (error) {
        // error if access is denied
        res.status(401).json(createError(401, "Access denied"));
    }
};
const Admin = require("../models/Admin");
const mongoose = require('mongoose');
const createError = require("http-errors");
const jwt = require('jsonwebtoken')

class Controller {

    //Get all the Categories
    login = (req, res, next) => {
        // get the data from the request body
        const { email, password } = req.body;
        // search for the user with the given email
        Admin.findOne({ email })
            .then((user) => {
                // check whether the user is exist and the password matches with the hashed one
                if (!user || !user.checkPassword(password)) {
                    throw createError(401, "email or password is incorrect");
                }
                let token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);

                // create JWT token and return it
                res.json({ token: token })
            })
            .catch(next);
    };
}

const controller = new Controller();
module.exports = controller;
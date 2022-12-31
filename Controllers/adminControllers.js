const Admin = require("../models/Admin");
const mongoose = require('mongoose');

class Controller {

    //Get all the admins
    getAll(req, res, next) {
        Admin.find((err, response) => {
            if (err) return res.status(500).json({
                message: `ERROR ${err}`,
                success: false,
            });
            res.status(200).json({ success: true, message: "Get Admin Successfully", data: response });
        })
    }

    //Add a Admin
    post(req, res, next) {
        const data = req.body;

        // find the users of the same email or username
        Admin.find({ email: data.email })
            .then((users) => {
                // check if the users length more than zero
                if (users.length > 0) {
                    res
                        .status(401)
                        .send({ success: false, message: "email is already token" });
                }
            })
            .catch(next);

        // create new user with the data added
        Admin.create(data)
            .then((user) => {
                // create JWT token and return it


                res.status(200).json({ success: true, message: "Add Admin Successfully", data: user });
            })
            .catch(next);

    }

    //Update a Admin
    put(req, res, next) {
        let { id } = req.params;
        let { filename } = req.file || {};
        let { title } = req.body;
        let body = { title: title, icon: filename };
        Admin.updateOne(
            { _id: id },
            {
                $set: body,
            },
            (err, response) => {
                if (err) return res.status(500).json({
                    message: `ERROR ${err}`,
                    success: false,
                });
                res.status(200).send({ success: true, message: "Category Updated Successfully", data: response });
            }
        );
    }
    //Delete an Admin
    delete(req, res, next) {
        let { id } = req.params;
        Admin.findByIdAndDelete({ _id: id }, (err, response) => {
            if (err) return res.status(500).json({
                message: `ERROR ${err}`,
                success: false,
            });
            res.status(200).send({ success: true, message: "Deleted Successfully", data: response });
        });
    }
}

const controller = new Controller();
module.exports = controller;
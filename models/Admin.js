const bcrypt = require("bcrypt")
const { Schema, model } = require("mongoose");

const AdminSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
        collection: "admins"
    }
)
//to hash the password before save
AdminSchema.pre("save", function (next) {
    if (this.isNew || this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    next();
});

// to check hashed password and and compare them by using bcrypt
AdminSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
const Admin = model("Admin", AdminSchema);
module.exports = Admin;

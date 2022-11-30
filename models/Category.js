const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
        collection: "categories"
    }
)

const Category = model("Category", CategorySchema);
module.exports = Category;

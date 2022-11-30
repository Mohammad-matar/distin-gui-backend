const { Schema, model, Types } = require("mongoose");

const ItemSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        img: String,
        price: String,
        description: String,
        category_id: {
            type: Types.ObjectId,
            ref: "Category",
        }
    },
    {
        timestamps: true,
        collection: "items"
    }
)

const Item = model("Item", ItemSchema);
module.exports = Item;

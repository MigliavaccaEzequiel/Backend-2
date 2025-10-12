import { Schema, model } from 'mongoose'

const ProductSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

export default model("Product", ProductSchema)
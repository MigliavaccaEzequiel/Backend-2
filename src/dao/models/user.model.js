import mongoose, { Schema, model } from 'mongoose'

const UserSchema = new Schema ({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user",
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        default: null
    }
    }, { timestamps: true }
);

export default model("User", UserSchema)
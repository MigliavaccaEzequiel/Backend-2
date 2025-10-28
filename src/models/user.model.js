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
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts",
        default: null,
    },
    role: {
        type: String,
        enum: ['user', 'user_premium', 'admin'],
        default: "user",
    }
    }, { timestamps: true }
);

export default model("User", UserSchema)
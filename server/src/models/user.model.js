const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username is already taken"],
        require: [true, "username is required"]
    },
    email: {
        type: String,
        unique: [true, "Account is already exists with this email address"],
        require: [true, "username is required"]
    },
    password: {
        type: String,
        require: [true, "username is required"]
    }
}, {
    timestamps: true
})


const userModel = mongoose.model("User", userSchema)

module.exports = userModel

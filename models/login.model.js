const mongoose = require("mongoose")

const login = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            unique: true
        },

        password: {
            type: String,
            required: true
        },

    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", login)

module.exports = User
const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        sprite: {
            type: String,
        }
    },
    {
        timestamp: true,
    }
)

module.exports = mongoose.model('User', userSchema);
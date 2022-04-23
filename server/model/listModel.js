const mongoose = require('mongoose');

const listSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        text: {
            type: String,
            require: [true, 'Please add a text value'],
        },
        description: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('List', listSchema);
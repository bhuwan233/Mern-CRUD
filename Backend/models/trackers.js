const mongoose = require('mongoose');

const trackerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, 'Tracker Name is Mandatory!']
        },
        order: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Tracker", trackerSchema);
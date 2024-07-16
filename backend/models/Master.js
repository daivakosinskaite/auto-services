const mongoose = require('mongoose');

const MasterSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Master', MasterSchema);

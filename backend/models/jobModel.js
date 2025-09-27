const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    title: {   
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    jobVacancies: {
        type: Number,   
        default: 1,
        required: true
    },
    requirements: {
        type: [String],
        required: true
    },
    location: { 
        type: String,
        required: true
    },
    salaryRange: {
        type: String,
        required: true
    },
    jobType: {
        type: String,   
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        required: true
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
    applicationDeadline: {
        type: Date,
    },
    applicationFee: {
        type: Number,
        default: 0
    },
    skills: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Job', jobSchema);

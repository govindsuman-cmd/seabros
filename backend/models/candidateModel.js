const { application } = require("express");
const mongoose = require("mongoose");
const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    jobAppliedFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
    },
    qualification: {
        type: String,
        required: true
    },
    nationality:{
        type: String,
        required: true
    },
    age: {
        type: Number,   
        required: true
    },
    skills: {
        type: [String],
    },
    experience: {
        type: Number,
        required: true
    },  
    experienceAs: {
        type: String,   
        required: true
    },
    idProof: {
        type: String,   
        required: true
    },  
    resume: {
        type: String,   
        required: true
    },
    domicile: {
        type: String,
        required: true
    },
    address: {
        type: String,           
        required: true
    },
    interviewDate: {
        type: Date,
        required: true
    },
    applicationDate: {
        type: Date,     
        default: Date.now
    },
    status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
 }

}, { timestamps: true })

module.exports = mongoose.model("Candidate", candidateSchema);
const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hackathon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hackathon",
        required: true
    },
    ideaSubmitted: { type: Boolean, default: false },
    teamFormed: { type: Boolean, default: false },
    problemStatementSelected: { type: Boolean, default: false },
    prototypeStarted: { type: Boolean, default: false },
    prototypeCompleted: { type: Boolean, default: false },
    submissionCompleted: { type: Boolean, default: false },
    presentationCompleted: { type: Boolean, default: false },
    finalResult: {
        type: String,
        enum: ["Pending", "Participated", "Shortlisted", "Winner"],
        default: "Pending"
    },
    notes: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

trackerSchema.index({ user: 1, hackathon: 1 }, { unique: true });

module.exports = mongoose.model("Tracker", trackerSchema);
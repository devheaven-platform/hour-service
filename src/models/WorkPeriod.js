/* eslint-disable no-underscore-dangle, no-param-reassign */
const mongoose = require("mongoose");
const uuid = require("uuid");

/**
 * @swagger
 * components:
 *   schemas:
 *     WorkPeriod:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the workperiod
 *           example: 55417624-c159-4eab-9260-d4679a2e9b31
 *         employee:
 *           type: string
 *           description: The id of the employee
 *           example: 55417624-c159-4eab-9260-d4679a2e9b31
 *         context:
 *           type: string
 *           description: The context of the workperiod
 *           example: Worked on analyzing a project.
 *         startDate:
 *           type: Date
 *           description: The start date of the workperiod
 *           example: 1-1-2019 12:00:00
 *         endDate:
 *           type: Date
 *           description: The end date of the workperiod
 *           example: 1-1-2-2019 18:00:00
 *       required:
 *         - context
 *         - employee
 *         - startDate
 *         - endDate
 *         - createdAt
 *         - updatedAt
 */
const WorkPeriod = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v4,
    },
    employee: {
        type: String,
        default: uuid.v4,
    },
    context: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        default: 0,
    },
}, { timestamps: true });

WorkPeriod.set("toJSON", {
    virtuals: true,
    vesionKey: false,
    transform: (doc, ret) => { delete ret._id; },
});

module.exports = mongoose.model("WorkPeriod", WorkPeriod);
/* eslint-enable no-underscore-dangle, no-param-reassign */

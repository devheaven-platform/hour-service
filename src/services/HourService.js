const WorkPeriod = require( "../models/WorkPeriod" );

/**
 * Gets all workperiods from the database
 *
 * @returns a list of workperiods
 */
const getWorkPeriods = async () => WorkPeriod.find().exec();

/**
 * Gets one workperiod from the database
 *
 * @returns the board or null
 */
const getWorkPeriodById = async id => WorkPeriod.findById( id ).exec();

/**
 * Creates a new workperiod.
 *
 * @param {Object} newWorkPeriod the workperiod to add
 * @returns the new workperiod or null if an error occurred
 */
const createWorkPeriod = async ( newWorkPeriod ) => {
    const workperiod = new WorkPeriod( newWorkPeriod ).save();
    return workperiod;
};

/**
 * Updates a existing workperiod
 *
 * @param {String} id the id of the workperiod to update
 * @param {Object} board the updated workperiod values
 * @returns the updated workperiod or null if an error occurred
 */
const updateWorkPeriod = async ( id, workperiod ) => WorkPeriod.findOneAndUpdate( { _id: id }, workperiod, { new: true } ).exec();

/**
 * Deletes a workperiod from the database.
 *
 * @param {String} id the id of the workperiod to delete
 * @returns the deleted workperiod or null if an error occurred
 */
const deleteWorkPeriod = async ( id ) => {
    const workperiod = await WorkPeriod.findByIdAndRemove( id ).exec();
    if ( !workperiod ) {
        return null;
    }
    return workperiod;
};

module.exports = {
    getWorkPeriods,
    getWorkPeriodById,
    createWorkPeriod,
    updateWorkPeriod,
    deleteWorkPeriod,
};

const ApiError = require( "../models/Error" );
const validate = require( "../validators/HourValidator" );
const HourService = require( "../services/HourService" );

/**
 * Gets all the workperiods from the database
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const getWorkPeriods = async ( req, res ) => {
    const workperiods = await HourService.getWorkPeriods(req.query);
    return res.json( workperiods );
};
/**
 * Gets one workperiods from the database
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const getWorkPeriodById = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    const workperiod = await HourService.getWorkPeriodById( req.params.id );

    if ( !workperiod ) {
        return res.status( 404 ).json( new ApiError( "Workperiod not found" ) );
    }

    return res.json( workperiod );
};

/**
 * Creates a new workperiod
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const createWorkPeriod = async ( req, res ) => {
    const errors = validate.create( req.body );

    if ( Object.keys( errors ).length > 0 ) {
        return res.status( 400 ).json( new ApiError( "One or more values are invalid", errors ) );
    }

    const workperiod = await HourService.createWorkPeriod( req.body );

    return res.status( 201 ).json( workperiod );
};

/**
 * Updates an existing workperiod
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const updateWorkPeriod = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    if ( Object.keys( req.body ).length === 0 ) {
        return res.status( 400 ).json( new ApiError( "One or more values are required" ) );
    }

    const errors = validate.update( req.body );
    if ( Object.keys( errors ).length > 0 ) {
        return res.status( 400 ).json( new ApiError( "One or more values are invalid", errors ) );
    }

    const workperiod = await HourService.updateWorkPeriod( req.params.id, req.body );

    return res.status( 200 ).json( workperiod );
};

/**
 * Deletes a workperiod
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const deleteWorkPeriod = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    const workperiod = await HourService.deleteWorkPeriod( req.params.id );

    if ( !workperiod ) {
        return res.status( 404 ).json( new ApiError( "WorkPeriod not found" ) );
    }

    return res.status( 204 ).send();
};


module.exports = {
    getWorkPeriods,
    getWorkPeriodById,
    createWorkPeriod,
    updateWorkPeriod,
    deleteWorkPeriod,
};

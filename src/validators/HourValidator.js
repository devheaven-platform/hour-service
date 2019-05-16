/* eslint complexity: 0 */
const validator = require( "validator" );

const GenericValidator = require( "./GenericValidator" );

/**
 * Validates the create workperiod request
 *
 * @param {Object} body the body containing the values
 * @returns an error object containing the field errors
 */
const create = ( body ) => {
    const errors = {};

    if ( body.context === undefined ) {
        errors.name = "Context is required";
    } if ( !GenericValidator.isString( body.context ) ) {
        errors.name = "Context must be of type string";
    } else if ( body.context.trim() === "" ) {
        errors.name = "Context cannot be a empty string";
    } else if ( !validator.isLength( body.context, { min: 5, max: 30 } ) ) {
        errors.name = "Context must be between 5 and 30 characters";
    }
    if ( body.startDate === undefined ) {
        errors.name = "Start date is required";
    } if ( !GenericValidator.isDate( new Date( body.startDate ) ) ) {
        errors.name = "Start date must be of type string";
    }

    if ( body.endDate === undefined ) {
        errors.name = "End date is required";
    } if ( !GenericValidator.isDate( new Date( body.endDate ) ) ) {
        errors.name = "End date must be of type string";
    } else if ( new Date( body.endDate ).getDate() < new Date( body.startDate ).getDate ) {
        errors.name = "End date must be after the begin date";
    }
    if ( !GenericValidator.isString( body.employee ) || !GenericValidator.id( body.employee ) ) {
        errors.project = "Employee id is required";
    }

    return errors;
};

/**
 * Validates the update board request
 *
 * @param {Object} body the body containing the values
 * @returns an error object containing the field errors
 */
const update = ( body ) => {
    const errors = {};

    if ( body.context !== undefined ) {
        if ( !GenericValidator.isString( body.context ) ) {
            errors.name = "Context must be of type string";
        } else if ( body.context.trim() === "" ) {
            errors.name = "Context cannot be a empty string";
        } else if ( !validator.isLength( body.context, { min: 5, max: 30 } ) ) {
            errors.name = "Context must be between 5 and 30 characters";
        }
    }

    if ( body.startDate !== undefined && body.endDate !== undefined ) {
        if ( !GenericValidator.isDate( new Date( body.startDate ) ) ) {
            errors.name = "Start date must be of type string";
        } else if ( new Date( body.startDate ).getDate() < Date.now() ) {
            errors.name = "Start date must be in the future";
        }
        if ( !GenericValidator.isDate( new Date( body.endDate ) ) ) {
            errors.name = "End date must be of type string";
        } else if ( new Date( body.endDate ).getDate() < Date.now() ) {
            errors.name = "End date must be in the future";
        } else if ( new Date( body.endDate ).getDate() < new Date( body.startDate ).getDate() ) {
            errors.name = "End date must be in the future";
        }
    } else if ( body.startDate !== undefined ) {
        errors.name = "End date must be passed aswell";
    } else if ( body.endDate !== undefined ) {
        errors.name = "Start date must be passed aswell";
    }

    return errors;
};

module.exports = {
    id: GenericValidator.id,
    create,
    update,
};

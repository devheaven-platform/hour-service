const expressPrometheus = require( "express-prom-bundle" );
const expressWinston = require( "express-winston" );
const swaggerUi = require( "swagger-ui-express" );
const bodyparser = require( "body-parser" );
const Prometheus = require( "prom-client" );
const mongoose = require( "mongoose" );
const passport = require( "passport" );
const express = require( "express" );
const cors = require( "cors" );
require( "dotenv" ).config();

const strategy = require( "./config/passport/Strategy" );
const logger = require( "./config/logger/Logger" );
const specs = require( "./config/swagger/Swagger" );

const app = express();
app.disable( "x-powered-by" );

// Server config
const port = process.env.NODE_PORT;
const host = process.env.NODE_HOST;
const mongoDB = process.env.MONGO_DB;
const mongoURI = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

// Middleware
app.use( bodyparser.json() );
app.use( cors() );
app.use( passport.initialize() );
app.use( passport.session() );
strategy( passport, jwtSecret );
app.use( expressWinston.logger( logger ) );

// Connect database
mongoose
    .connect( mongoURI + mongoDB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    } )
    .then( () => logger.info( "MongoDB connected" ) )
    .catch( error => logger.error( error.stack ) );

// Register prometheus
Prometheus.collectDefaultMetrics();
app.use( expressPrometheus() );

// Metrics
app.get( "/metrics", ( req, res ) => {
    res.set( "Content-Type", Prometheus.register.contentType );
    res.end( Prometheus.register.metrics() );
} );

// Health
app.get( "/health", ( req, res ) => res.json( {
    message: "Service is running",
} ) );

// Docs
app.use( "/docs", swaggerUi.serve, swaggerUi.setup( specs ) );

// Routes
app.use( "/hours", require( "./routes/HourRoutes" ) );

// Not found
app.all( "*", ( req, res ) => res.status( 404 ).json( {
    message: "Resource Not Found",
} ) );

// Global error handler
// eslint-disable-next-line
app.use( ( error, req, res, next ) => {
    logger.error( error.stack );
    return res.status( 500 ).json( {
        message: "An unexpected error occurred",
    } );
} );

// Start service
app.listen( port, () => {
    logger.info( `Service: listening on http://${ host }:${ port }` );
} );

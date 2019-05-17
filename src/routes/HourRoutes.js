const express = require( "express" );

const asyncMiddleware = require( "../config/middleware/Async" );
const controller = require( "../controllers/HourController" );

/**
 * @swagger
 * tags:
 *   - name: WorkPeriods
 *     description: All workperiod related routes
 */
const router = express.Router();

/**
 * @swagger
 * /hours/:
 *    get:
 *      operationId: GetWorkPeriods
 *      summary: Returns a list of workperiods
 *      responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/WorkPeriod'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - WorkPeriods
 */
router.get( "/", asyncMiddleware( controller.getWorkPeriods ) );

/**
 * @swagger
 * /hours/{id}:
 *    get:
 *      operationId: GetWorkPeriodById
 *      summary: Returns a single workperiod
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the workperiod to retrieve
 *      responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/WorkPeriod'
 *          '400':
 *            $ref: '#/components/responses/BadRequest'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '404':
 *            $ref: '#/components/responses/NotFound'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - Workperiods
 */
router.get( "/:id", asyncMiddleware( controller.getWorkPeriodById ) );

/**
 * @swagger
 * /hours/:
 *    post:
 *      operationId: CreateWorkPeriod
 *      summary: Create a workperiod
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                employee:
 *                  type: string
 *                  description: The employee of the workperiod
 *                  example: 55417624-c159-4eab-9260-d4679a2e9b31
 *                context:
 *                  type: string
 *                  description: The context of the workperiod
 *                  example: Designed mobile interface
 *                startDate:
 *                  type: Date
 *                  description: The startdate of the workperiod
 *                  example: 1-1-2019 12:00:00
 *                endDate:
 *                  type: Date
 *                  description: The enddate of the workperiod
 *                  example: 1-1-2019 18:00:00
 *              required:
 *                - employee
 *                - context
 *                - startDate
 *                - endDate
 *      responses:
 *          '204':
 *            description: Created
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/WorkPeriod'
 *          '400':
 *            $ref: '#/components/responses/BadRequest'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - WorkPeriods
 */
router.post( "/", asyncMiddleware( controller.createWorkPeriod ) );

/**
 * @swagger
 * /hours/{id}:
 *    patch:
 *      operationId: UpdateWorkPeriod
 *      summary: Update a existing workperiod
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the workperiod to update
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                employee:
 *                  type: string
 *                  description: The employee of the workperiod
 *                  example: 55417624-c159-4eab-9260-d4679a2e9b31
 *                context:
 *                  type: string
 *                  description: The context of the workperiod
 *                  example: Designed mobile interface
 *                startDate:
 *                  type: Date
 *                  description: The startdate of the workperiod
 *                  example: 1-1-2019 12:00:00
 *                endDate:
 *                  type: Date
 *                  description: The enddate of the workperiod
 *                  example: 1-1-2019 18:00:00
 *      responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/WorkPeriod'
 *          '400':
 *            $ref: '#/components/responses/BadRequest'
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '404':
 *            $ref: '#/components/responses/NotFound'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - WorkPeriods
 */
router.patch( "/:id", asyncMiddleware( controller.updateWorkPeriod ) );

/**
 * @swagger
 * /hours/{id}:
 *    delete:
 *      operationId: DeleteWorkPeriod
 *      summary: Delete one workperiod
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the workperiod to delete
 *      responses:
 *          '204':
 *            description: No Content
 *          '401':
 *            $ref: '#/components/responses/Unauthorized'
 *          '404':
 *            $ref: '#/components/responses/NotFound'
 *          '500':
 *            $ref: '#/components/responses/InternalServerError'
 *      tags:
 *        - Boards
 */
router.delete( "/:id", asyncMiddleware( controller.deleteWorkPeriod ) );

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The profile ID
 *         bio:
 *           type: string
 *           description: The biography or description of the user
 *           nullable: true
 *         userId:
 *           type: integer
 *           description: The ID of the associated user
 *         user:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateProfileDto:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         bio:
 *           type: string
 *           description: The biography or description of the user
 *           nullable: true
 *         userId:
 *           type: integer
 *           description: The ID of the user this profile belongs to
 *     UpdateProfileDto:
 *       type: object
 *       properties:
 *         bio:
 *           type: string
 *           description: The new biography or description
 *     ProfileResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         bio:
 *           type: string
 *         userId:
 *           type: integer
 *         user:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

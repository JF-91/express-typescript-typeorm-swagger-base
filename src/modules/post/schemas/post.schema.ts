/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The post ID
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         published:
 *           type: boolean
 *           description: Whether the post is published
 *         authorId:
 *           type: integer
 *           description: The ID of the author
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *     CreatePostDto:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - authorId
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         published:
 *           type: boolean
 *           default: false
 *         authorId:
 *           type: integer
 *           description: The ID of the author
 *         categoryIds:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of category IDs
 *     UpdatePostDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         published:
 *           type: boolean
 *         categoryIds:
 *           type: array
 *           items:
 *             type: integer
 */
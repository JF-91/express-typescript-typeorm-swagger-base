/**
 * @swagger
 * components:
 *   schemas:
 *     Page:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The page ID
 *         title:
 *           type: string
 *           description: The title of the page
 *         content:
 *           type: string
 *           description: The content of the page
 *         slug:
 *           type: string
 *           description: URL-friendly version of the title
 *         published:
 *           type: boolean
 *           description: Whether the page is published
 *           default: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreatePageDto:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - slug
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the page
 *         content:
 *           type: string
 *           description: The content of the page
 *         slug:
 *           type: string
 *           description: URL-friendly version of the title
 *         published:
 *           type: boolean
 *           description: Whether to publish the page immediately
 *           default: false
 *     UpdatePageDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The new title of the page
 *         content:
 *           type: string
 *           description: The new content of the page
 *         slug:
 *           type: string
 *           description: The new URL-friendly version of the title
 *         published:
 *           type: boolean
 *           description: The new published status
 *     PageResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         slug:
 *           type: string
 *         published:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

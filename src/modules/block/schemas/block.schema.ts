/**
 * @swagger
 * components:
 *   schemas:
 *     BlockImage:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *         alt:
 *           type: string
 *         width:
 *           type: integer
 *         height:
 *           type: integer
 *         order:
 *           type: integer
 *     BlockVideo:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *         alt:
 *           type: string
 *         width:
 *           type: integer
 *         height:
 *           type: integer
 *     Block:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         content:
 *           type: string
 *         headline:
 *           type: string
 *         type:
 *           type: string
 *           enum: [TEXT, IMAGE, VIDEO, GALLERY, EMBED, CODE]
 *         urls:
 *           type: object
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BlockImage'
 *         videos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BlockVideo'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateBlockDto:
 *       type: object
 *       required:
 *         - name
 *         - content
 *         - type
 *       properties:
 *         name:
 *           type: string
 *         content:
 *           type: string
 *         headline:
 *           type: string
 *         type:
 *           type: string
 *           enum: [TEXT, IMAGE, VIDEO, GALLERY, EMBED, CODE]
 *         urls:
 *           type: object
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BlockImage'
 *         videos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BlockVideo'
 */

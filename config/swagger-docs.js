

/**
 * @swagger
 * tags:
 *   name: User
 *   description: APIs related to User Registration.
 */
/**
 * @swagger
 * tags:
 *   name: Search
 *   description: APIs related to searching contacts.
 */
/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: APIs related to User Contacts.
 */
/**
 * @swagger
 * tags:
 *   name: Spam
 *   description: APIs related to Spam contacts.
 */



/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user.
 *     description: Registers a new user with a name, phone number, email, and password.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User registered successfully.
 *       '400':
 *         description: Bad request due to missing or invalid parameters.
 *       '500':
 *         description: Internal server error.
 */
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login.
 *     description: Logs in a user with a phone number and password.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *       '401':
 *         description: Unauthorized access due to incorrect credentials.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/auth/account:
 *   delete:
 *     summary: Delete user account.
 *     description: Deletes the logged-in user's account permanently.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       bearerAuth:
 *           name: token
 *     parameters:
 *       - in: header
 *         name: token
 *         description: JWT token obtained after user authentication.
 *         required: true
 *     responses:
 *       '200':
 *         description: Account deleted successfully.
 *       '401':
 *         description: Unauthorized access due to missing or invalid token.
 *       '500':
 *         description: Internal server error.
 *   patch:
 *     summary: Update user account.
 *     description: Updates the logged-in user's account information.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       bearerAuth:
 *           name: token
 *     parameters:
 *       - in: header
 *         name: token
 *         description: JWT token obtained after user authentication.
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Account updated successfully.
 *       '400':
 *         description: Bad request due to missing or invalid parameters.
 *       '401':
 *         description: Unauthorized access due to missing or invalid token.
 *       '500':
 *         description: Internal server error.
 */










/**
 * @swagger
 * /api/spam:
 *   post:
 *     summary: Mark a contact as spam.
 *     description: Marks a contact as spam based on the provided phone number.
 *     tags: [Spam]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       bearerAuth:
 *           name: token
 *     parameters:
 *       - in: header
 *         name: token
 *         description: JWT token obtained after user authentication.
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Contact marked as spam successfully.
 *       '400':
 *         description: Bad request due to missing or invalid parameters.
 *       '401':
 *         description: Unauthorized access due to missing or invalid token.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/spam:
 *   delete:
 *     summary: Remove a contact from spam.
 *     description: Removes a contact from the spam list based on the provided phone number.
 *     tags: [Spam]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       bearerAuth:
 *           name: token
 *     parameters:
 *       - in: header
 *         name: token
 *         description: JWT token obtained after user authentication.
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Contact removed from spam successfully.
 *       '400':
 *         description: Bad request due to missing or invalid parameters.
 *       '401':
 *         description: Unauthorized access due to missing or invalid token.
 *       '500':
 *         description: Internal server error.
 */







/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search contacts with pagination.
 *     description: Retrieves contacts based on search query, page, and limit.
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       bearerAuth:
 *           name: token
 *     parameters:
 *       - in: header
 *         name: token
 *         description: JWT token obtained after user authentication.
 *         required: true
 *       - in: query
 *         name: query
 *         description: Search query for contacts. Enter name or phone number.
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: Page number for pagination (default is 1).
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         description: Number of contacts per page (default is 10).
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *     responses:
 *       '200':
 *         description: Successful response with paginated contacts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalResults:
 *                   type: integer
 *                   description: Total number of search results.
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages based on limit.
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number.
 *                 contacts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Contact ID.
 *                       name:
 *                         type: string
 *                         description: Contact's name.
 *                       phoneNumber:
 *                         type: string
 *                         description: Contact's phone number.
 *                       isSpam:
 *                         type: boolean
 *                         description: Indicates if contact is marked as spam.
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: User ID associated with the contact.
 *                           name:
 *                             type: string
 *                             description: User's name.
 *                           phoneNumber:
 *                             type: string
 *                             description: User's phone number.
 *                           email:
 *                             type: string
 *                             description: User's email address.
 *       '400':
 *         description: Bad request due to missing or invalid parameters.
 *       '500':
 *         description: Internal server error.
 */






/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get user contacts.
 *     description: Retrieves the logged-in user's contacts.
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       bearerAuth:
 *           name: token
*     parameters:
*       - in: header
*         name: token
*         description: JWT token obtained after user authentication.
*         required: true
*       - in: query
*         name: page
*         description: Page number for pagination.
*         schema:
*           type: integer
*           minimum: 1
*           default: 1
*       - in: query
*         name: limit
*         description: Number of contacts per page.
*         schema:
*           type: integer
*           minimum: 1
*           maximum: 100
*           default: 10
 *     responses:
 *       '200':
 *         description: Contacts retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Contact ID.
 *                   name:
 *                     type: string
 *                     description: Contact's name.
 *                   phoneNumber:
 *                     type: string
 *                     description: Contact's phone number.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Contact creation date.
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Contact last update date.
 *       '401':
 *         description: Unauthorized access due to missing or invalid token.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Add a new contact.
 *     description: Adds a new contact for the logged-in user.
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       bearerAuth:
 *           name: token
 *     parameters:
 *       - in: header
 *         name: token
 *         description: JWT token obtained after user authentication.
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Contact added successfully.
 *       '400':
 *         description: Bad request due to missing or invalid parameters.
 *       '401':
 *         description: Unauthorized access due to missing or invalid token.
 *       '500':
 *         description: Internal server error.
 */
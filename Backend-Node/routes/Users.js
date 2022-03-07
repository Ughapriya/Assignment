const express = require('express');
const router = express.Router();
const pool = require('./database.js')

/* const users = [{
    "id": 1,
    "name": "James",
    "email": "James@123.com",
    "password": "1!23#4",
    "role": "EMPLOYEE"
}, {
    "id": 2,
    "name": "Peter",
    "email": "Peter@123.com",
    "password": "8^23!3",
    "role": "EMPLOYEE"
},
{
    "id": 3,
    "name": "John",
    "email": "John@123.com",
    "password": "98!891",
    "role": "ADMIN"
},
{
    "id": 4,
    "name": "Fred",
    "email": "Fred@123.com",
    "password": "69651",
    "role": "ADMIN"
}]; */

//Get all user details
router.get('/', async (req, res) => {
    try {
        let conn = await pool.getConnection();
        var query = "select * from employees";
        var users = await conn.query(query);
        users.sort((a, b) => {
            return a.email.localeCompare(b.email);
        })
        return res.status(200).send(users)
    } catch (err) {
        console.log('err: ', err);
        return res.status(500).send(err);
    }
});

/**
 * @swagger 
 * components:
 *   schemas:
 *    Users:
 *      type: object
 *      required: 
 *          - id
 *      properties:
 *       id:
 *          type: string
 *          description: User identification number
 *      example:
 *      id: 1
 *      email: aaa@gmail.com
 *      password: 12345
*/

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The employees details API
*/

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: Get user information by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: User ID
 *        
 *    responses:
 *      200:
 *          description: The User information by ID
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Users'
 *                  example:
 *                      id: 111
 *                      email: "priya@gmail.com"
 *                      password: "Xse@3"
 *      404:
 *          description: A user with the specified ID was not found.
 *      500:
 *          description: Something Went Wrong.
 */

//Get users information by user ID
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        let conn = await pool.getConnection();
        const query = 'SELECT id, name, email, password, role FROM employees WHERE id=?';
        var users = await conn.query(query, userId);
        if (users.length == 0) {
            return res.status(404).send('User Not Found');
        } else {
            return res.status(200).send(users)
        }
    } catch (err) {
        console.log('err: ', err);
        return res.status(500).send(err);
    }
});

//Validate user details by login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`${email} and ${password}`);
        let conn = await pool.getConnection();
        const query = `SELECT id, name, email, password, role FROM employees WHERE email='${email}' AND password= '${password}'`;
        var users = await conn.query(query);
        if (users.length == 0) {
            res.status(401).send({
                message: "The email or the password is not correct"
            })
        } else {
            if (users[0].role == 'ADMIN') {
                var query1 = "select * from employees";
                var resp = await conn.query(query1);
                res.status(200).send({
                    message: resp
                })
            } else {
                res.status(200).send({
                    message: users
                })
            }
        }
    } catch (err) {
        console.log('err: ', err);
        return res.status(500).send(err);
    }
})

module.exports = router;
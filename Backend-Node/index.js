const express = require('express');
const bodyParser = require("body-parser");
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const usersRouter = require('./routes/Users.js');

const PORT = process.env.PORT || 8000;
const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Employee details API",
            description: "Simple Employee details API",
            version: "1.0.0"
        },
        servers: [{
            url: "http://localhost:8000",
        }],
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`))
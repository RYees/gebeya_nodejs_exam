var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('express-jwt');
var fs = require('fs');
var multer = require('multer');

const mongoose = require('./config/mongoose');
const { jwt_key, port } = require('./config/vars');
const { routes } = require('./config/routes');

const { hasPermissions } = require('./middlewares/auth');

var jobRouter = require('./routes/job');
var AauthRouter = require('./routes/Aauth');
var adminRouter = require('./routes/admin');



var app = express();
const expressSwagger = require('express-swagger-generator')(app);

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a nodejs-finalExam for Job Vacancy Appication',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: `localhost:${port}`,
        basePath: '/',
        produces: [
            "application/json",
            
        ],
        schemes: ['http', 'https'],
		securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)
// open mongoose connection
mongoose.connect();

app.use(logger('dev'));
app.use('/public',express.static('public/images'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api-docs-v2', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(jwt({ secret: jwt_key, algorithms: ['HS256']})
.unless({path: routes.public})); // Auth


// login information state


app.use('/admin', adminRouter);
app.use('/job',jobRouter);
app.use('/Aauth',AauthRouter);



module.exports = app;

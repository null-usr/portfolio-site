import express, { NextFunction, Request, Response } from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import createError from 'http-errors';
import favicon from 'serve-favicon';
//import logger from 'morgan';
//import cors from "cors";
//import bodyParser from 'body-parser'

import user_routes from './controllers/users';
import projects_controller from './controllers/projects';
import posts_controller from './controllers/posts';
import console_controller from './controllers/console';


import static_pages from './controllers/static_pages';
import * as dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.use(expressLayouts);
app.set('layout', path.join(__dirname, 'views', 'layouts', 'main_layout'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));

app.use(express.json());

//if this doesn't work npm i cors, app.use(cors());
//allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }
    next();
});

//============================ STATIC FILES ============================================
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// https://expressjs.com/en/starter/static-files.html
// https://stackoverflow.com/questions/30473993/how-to-use-npm-installed-bootstrap-in-express
app.use("/bootstrap", express.static(path.join( process.cwd(), 'node_modules','bootstrap', 'dist')));
app.use("/jquery", express.static(path.join(process.cwd(), 'node_modules', 'jquery', 'dist')));
app.use("/popper", express.static(path.join(process.cwd(), 'node_modules','popper.js', 'dist')));
app.use("/winbox", express.static(path.join(process.cwd(), 'node_modules','winbox', 'dist')));
app.use("/fontawesome", express.static(path.join(process.cwd(), 'node_modules','@fortawesome',"fontawesome-free")));

// app.get('/', function (req: Request, res: Response) {
//     res.send('Hello World!');
// });
//Our Controller Routes ================================================

//disabling user routes for now
//user_routes(app);
static_pages(app);
projects_controller(app);
posts_controller(app);
console_controller(app);
//app.use( '/', index_route );

// catch 404 and forward to error handler ==================================================
app.use(function(req, res, next) {
    next(createError(404));
  });
// error handler
// https://stackoverflow.com/questions/50218878/typescript-express-error-function
app.use((err: { message: any; status: any; }, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error', {title: "Error", root: "/error"});
  });

app.listen(port, function () {
    console.log(`starting app on: ${port}`);
});

export default app;

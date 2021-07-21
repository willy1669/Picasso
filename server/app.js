'use strict';
import express from 'express';
import helmet from 'helmet';
import nocache from 'nocache';
import bodyParser from 'body-parser';
import compression from 'compression';

// Instantiate express server
const app = express();

app.use(nocache());
app.use(helmet);
app.disable('etag');
app.disable('x-powered-by');
app.use(helmet.hidePoweredBy());
app.use(helmet.contentSecurityPolicy);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Compress all routes
app.use(compression);

// catch invalid routes
app.all("*", (req, res) => {
    return res.status(404).json({
        error: "This route does not exist!",
    });
});

export default app;

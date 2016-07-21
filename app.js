"use strict";
/**
 * @file app.js
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// global variables
global['app'] = app;
// install routes
require('./routes/routes').init(app);
require('./routes/connectors').init(app);
require('./routes/push').init(app);
// start express server
app.listen(app.get('port'));
//# sourceMappingURL=app.js.map
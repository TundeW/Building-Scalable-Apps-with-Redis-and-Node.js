var express = require('express'); 
var app = express();
var routes = require('./routes');
var errorHandlers = require('./middleware/errorhandlers'); 
var log = require('./middleware/log'); 
var partials = require('express-partials');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var csrf = require('csurf');
var util = require('./middleware/utilities');
var flash = require('connect-flash');
var config = require('./config');
var io = require('./socket.io');
passport = require('./passport');

app.set('view engine', 'ejs');

app.set('view options', {defaultLayout: 'layout'});


app.use(partials());
app.use(log.logger);

app.use(express.static(__dirname + '/static'));
app.use(cookieParser(config.secret));
app.use(session({
    secret: config.secret, 
    saveUninitialized: true, 
    resave: true,
    store: new RedisStore(
           {url: config.redisUrl}
        )
    })
);

app.use(function(req, res, next){ if(req.session.pageCount)
    req.session.pageCount++; else
    req.session.pageCount = 1; next();
});

app.use(flash());
app.use(util.templateRoutes);


app.use(passport.passport.initialize()); 
app.use(passport.passport.session());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(csrf());
app.use(util.csrf);
app.use(util.authenticated);

app.get('/', routes.index);
app.get(config.routes.register, routes.register); 
app.post(config.routes.register, routes.registerProcess);
app.get(config.routes.login, routes.login); 
// app.get('/account/login', routes.login);
// app.post(config.routes.login, routes.loginProcess); 
app.get(config.routes.chat, [util.requireAuthentication], routes.chat);
app.get('/error', function(req, res, next){ 
    next(new Error('A contrived error'));
});
app.get(config.routes.logout, routes.logOut);
passport.routes(app);

app.use(errorHandlers.error);
app.use(errorHandlers.notFound);


var server = app.listen(config.port); 
io.startIo(server);
console.log("App server running on port 3000");




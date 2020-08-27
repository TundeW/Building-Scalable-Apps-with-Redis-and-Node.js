var exchange = require('../queue');


exports.logger = function logger(req, res, next){ 
    debug({url: req.url, ts: Date.now()});
    next();
};

function debug(message){ 
    exchange.done(function({channel, ex}){
        // ex.publish('debug.log', message); 
        channel.publish(ex.exchanger, 'debug.log', Buffer.from(JSON.stringify(message)))
    });
};



function error(message){ 
    exchange.done(function({channel, ex}){
        // ex.publish('error.log', message); 
        channel.publish(ex.exchanger, 'error.log', Buffer.from(JSON.stringify(message)))
    });
}

exports.debug = debug; 
exports.error = error;

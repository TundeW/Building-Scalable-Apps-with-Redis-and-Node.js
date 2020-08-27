var redis = require('redis'); 
let config = require('../config');

var client = redis.createClient(config.redisPort, config.redisHost); 

exports.client = client;
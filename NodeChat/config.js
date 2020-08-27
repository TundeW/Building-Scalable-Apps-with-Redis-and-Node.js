var config = {
    port: 3000,
    secret: 'secret',
    redisPort: 6379,
    redisHost: 'localhost',    
    routes: {
        login: '/account/login',
        logout: '/account/logout',
        register: '/account/register',
        chat: '/chat',
        facebookAuth: '/auth/facebook', 
        facebookAuthCallback: '/auth/facebook/callback',
        googleAuth: '/auth/google',
        googleAuthCallback: '/auth/google/callback'
    },
    host: 'http://localhost:3000',
    facebook: {
        appID: '284121939542671', 
        appSecret: '6be593c2a1cf662c79b2568944b52034',
    },
    google: {
        clientID: '285570309716-mdmuf37smg048vpei55jmecil439nbch.apps.googleusercontent.com',
        clientSecret: 'FjQ1JIBhtX0ty-QtX9pGiJcC'
    },
    crypto: {
        workFactor: 5000, 
        keylen: 32, 
        randomSize: 256
    },
    rabbitMQ: {
        URL: 'amqp://guest:guest@localhost:5672', 
        exchange: 'packtchat.log'
    }
};

module.exports = config;
const express = require('express');
const isAnAdult = require('../middlewares/isAnAdult');
const isInSS3 = require('../middlewares/isInSS3');
const Router = express.Router();

Router.post('/', 
    [ 
        isAnAdult, 
        isInSS3 
    ],
    (req, res) => {
    console.log('########### I GOT HERE!');
    const age = req.body.age;
    const studentClass = req.body.class;
    const resData = {
        age,
        studentClass
    }
    res.json({
        sucess: 'true',
        code: 200,
        data: resData

    })

});


module.exports = Router;
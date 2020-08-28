const express = require('express');
const Router = express.Router();

Router.get('/', 
    (req, res) => {
    const age = 25;
    const userIsActive = true;
    const location = 'Lagos';

    const resData = {
        teachers: [
            'Sikiru Moshood',
            'Waheed',
            'John'
        ],
        count: 3
    };
    
    res.json({
        sucess: 'true',
        code: 200,
        data: resData

    })

});


module.exports = Router;
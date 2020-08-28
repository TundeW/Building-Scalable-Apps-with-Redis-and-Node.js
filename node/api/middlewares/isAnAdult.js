const isAnAdult = (req, res, next) => {
    const { age } = req.body;
    if(age < 18){
        return res.json({
            status: 'Error',
            code: 400,
            message: 'You are underage.'
        });
    }

    // Proceed
    next();
};

module.exports = isAnAdult;


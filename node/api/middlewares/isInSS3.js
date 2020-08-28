const isInSS3 = (req, res, next) => {
    const studentClass = req.body.class;
    if(studentClass.toLowerCase() != 'ss3'){
        return res.json({
            status: 'error',
            code: '403',
            data: 'You are not in SS3'
        })
    }
    next();
}
module.exports = isInSS3
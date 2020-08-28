const express = require('express');
const bodyParser = require('body-parser');
const studentRoute = require('./routes/student');
const teacherRoute = require('./routes/teacher');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/student', studentRoute);
app.use('/teacher', teacherRoute);
console.log('########## I got here')
//Capture All 404 errors
app.use(function (req,res,next){
	res.status(404).send('This is not on us. This is on you. Know where you are headed!');
});

app.listen(3000, () => console.log(`server listening on port ${3000}`));
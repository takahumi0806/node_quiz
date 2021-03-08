const express = require('express');
const app = express();
const quizController = require('./controllers/QuizController');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
const server = app.listen(3000, function () {
  console.log('Node.js is listening to PORT:' + server.address().port);
});

app.set('view engine', 'ejs');

app.get('/', quizController.doGetHome);
app.get('/quiz', quizController.doGetQuiz);
app.post('/answer', quizController.doGetAnswer);

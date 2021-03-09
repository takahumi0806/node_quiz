const fetch = require('node-fetch');
const URL = 'https://opentdb.com/api.php?amount=10';
const questions = [];
const answerCorrect = [];

module.exports = {
  doGetHome(req, res, next) {
    res.render('index', {
      welcome: 'ようこそ',
      problemDescription: [{ description: '以下のボタンをクリックして下さい' }],
      problems: [],
      quizs: [],
      number: [],
      buttonText: [{ send: '開始', url: '/quiz', id: 'btn' }],
    });
  },

  doGetQuiz(req, res, next) {
    questions.length = 0;
    answerCorrect.length = 0;
    (async () => {
      try {
        const quizs = [];
        const response = await fetch(URL);
        const json = await response.json();
        json.results.forEach(function (element) {
          questions.push(element);
        });
        const mistake = json.results[0].incorrect_answers;
        const answerCorrect = json.results[0].correct_answer;
        mistake.forEach(function (element) {
          quizs.push(element);
        });
        quizs.push(answerCorrect);
        const quizSort = quizs.sort();
        res.render('index', {
          welcome: '問題１',
          problemDescription: [],
          problems: [json.results[0]],
          quizs: quizSort,
          number: 1,
          buttonText: [],
        });
      } catch (error) {
        console.log(error);
      }
    })();
  },
  doGetAnswer(req, res) {
    const quizs = [];
    const number = Number(req.body.number);
    if (req.body.selection === questions[number - 1].correct_answer) {
      answerCorrect.push(req.body.selection);
    }
    if (number < 10) {
      const mistake = questions[number].incorrect_answers;
      const answerCorrect = questions[number].correct_answer;
      mistake.forEach(function (element) {
        quizs.push(element);
      });
      quizs.push(answerCorrect);
      const quizSort = quizs.sort();
      res.render('index', {
        welcome: `問題${1 + number}`,
        problemDescription: [],
        problems: [questions[number]],
        quizs: quizSort,
        number: 1 + number,
        buttonText: [],
      });
    } else {
      res.render('index', {
        welcome: `正解は${answerCorrect.length}問です！！`,
        problemDescription: [
          { description: '再度チャレンジする時は以下をクリック' },
        ],
        problems: [],
        quizs: [],
        number: [],
        buttonText: [{ send: 'ホームに戻る', url: '/' }],
      });
    }
  },
};

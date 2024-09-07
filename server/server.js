const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = [{ num1: 1, num2: 2, operator: '+', result: 3 }];

// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res) => {
  res.send(calculations);
});

// POST /calculations
app.post('/calculations', (req, res) => {
  //req.body {num1, num2, operator}
  console.log('req.body', req.body);
  const num1 = Number(req.body.num1); //ex, 1 (number)
  const num2 = Number(req.body.num2); //ex, 2 (number)
  const operator = req.body.operator; // ex, '+' (string)

  //check the operation and calculate
  if (operator === '+') {
    const result = num1 + num2;
    //make a calculation object
    const calcObj = {
      num1,
      num2,
      operator,
      result: result,
    };
    //add calc object to calculation history
    calculations.push(calcObj);
  } else if (operator === '-') {
    const result = num1 - num2;
    //make a calculation object
    const calcObj = {
      num1,
      num2,
      operator,
      result: result,
    };
    //add calc object to calculation history
    calculations.push(calcObj);
  } else if (operator === '*') {
    const result = num1 * num2;
    //make a calculation object
    const calcObj = {
      num1,
      num2,
      operator,
      result: result,
    };
    //add calc object to calculation history
    calculations.push(calcObj);
  } else if (operator === '/') {
    const result = num1 / num2;
    //make a calculation object
    const calcObj = {
      num1,
      num2,
      operator,
      result: result,
    };
    //add calc object to calculation history
    calculations.push(calcObj);
  }

  res.sendStatus(201);
});

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
};

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
};

module.exports = app;

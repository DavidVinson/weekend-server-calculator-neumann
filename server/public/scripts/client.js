//make onReady function that will load server data when DOM is ready

//global operator to start; can be changed
let operator = '+';

function onReady() {
  console.log('client.js is sourced!');
  fetchCalculation();
}

//HTTP GET call to server
function fetchCalculation() {
  axios
    .get('/calculations')
    .then((response) => {
      //   console.log('server data', response.data);
      //display data on the DOM
      renderCalculationHistory(response.data);
    })
    .catch((error) => {
      console.error('Error in GET server data', error);
    });
}

//Display on DOM
function renderCalculationHistory(calculations) {
  const calcHistory = document.getElementById('resultHistory');
  const calcRecent = document.getElementById('recentResult');

  //clear calcHistory
  calcHistory.innerHTML = ``;
  //clear calcRecent
  calcRecent.innerHTML = ``;

  if (calculations.length > 0) {
    const recentResult = calculations[calculations.length - 1];
    calcRecent.innerHTML = `<h2>${recentResult.result}</h2>`;
    //loop calcHistory
    for (let calc of calculations) {
      calcHistory.innerHTML += `
      <ul>
          <li>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</li>
      </ul>
      `;
    }
  } else {
    calcHistory.innerHTML = ``;
    calcRecent.innerHTML = `<h2>0</h2>`;
  }
}

//form handler
function submitCalculation(event) {
  event.preventDefault();
  //submit form by clicking the equal sign button
  console.log('submit calculation');
  let numOneInput = document.getElementById('numOne').value;
  let numTwoInput = document.getElementById('numTwo').value;

  //   console.log('Number 1 value:', numOneInput);
  //   console.log('Number 2 value', numTwoInput);
  //   console.log('Operation', operator);

  //build calculation object and send to server: {num1, num2, operator}
  const calcObj = {
    numOne: numOneInput,
    numTwo: numTwoInput,
    operator,
  };
  //   console.log('calc Object', calcObj);
  //short hand axios POST
  axios
    .post('/calculations', calcObj)
    .then((response) => {
      console.log('get updates from server...');
      fetchCalculation();
      //reset input fields and operator
      //   document.getElementById('numOne').value = '';
      //   document.getElementById('numTwo').value = '';
      document.getElementById('calculator').reset();
      operator = '+';
    })
    .catch((error) => {
      console.error('Error POST calculation', error);
      alert('Something went wrong Clearing');
    });
  //longhand axios POST
  //   axios({
  //     method: 'POST',
  //     url: '/calculations',
  //     data: calcObj,
  //   })
  //     .then((response) => {
  //       console.log('get updates from server...');
  //       fetchCalculation();
  //     })
  //     .catch((error) => {
  //       console.error('Error POST calculation', error);
  //     });
}

function setOperator(event) {
  console.log('add btn clicked!', event.target);
  operator = event.target.id;
}

function clearHistory(event) {
  event.preventDefault();
  //send a delete request to server
  console.log('clear history');
  axios
    .delete('/calculations')
    .then((response) => {
      console.log('clear history');
      //refresh page
      fetchCalculation();
      //clear inputs on form
      //   document.getElementById('numOne').value = '';
      //   document.getElementById('numTwo').value = '';
      document.getElementById('calculator').reset();
      operator = '+';
    })
    .catch((error) => {
      console.error('Error Clearing History', error);
    });
}

//call onReady
onReady();

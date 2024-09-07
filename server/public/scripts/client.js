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
  //clear calcHistory
  calcHistory.innerHTML = ``;
  //loop calcHistory
  for (let calc of calculations) {
    calcHistory.innerHTML += `
      <ul>
          <li>${calc.num1} ${calc.operator} ${calc.num2} = ${calc.result}</li>
      </ul>
      `;
  }
}

//form handler
function submitCalculation(event) {
  event.preventDefault();
  //submit form by clicking the equal sign button
  console.log('submit calculation');
  let numOneInput = document.getElementById('numOne').value;
  let numTwoInput = document.getElementById('numTwo').value;

  console.log('Number 1 value:', numOneInput);
  console.log('Number 2 value', numTwoInput);
  console.log('Operation', operator);

  //build calculation object and send to server: {num1, num2, operator}
  const calcObj = {
    num1: numOneInput,
    num2: numTwoInput,
    operator,
  };
  axios.post('/calculations', calcObj).then((response) => {
    console.log('get updates from server...');
    fetchCalculation();
  });
}

function setOperator(event) {
  console.log('add btn clicked!', event.target);
  operator = event.target.id;
}

//call onReady
onReady();

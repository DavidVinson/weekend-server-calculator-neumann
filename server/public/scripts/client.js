//make onReady function that will load server data when DOM is ready
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

//call onReady
onReady();

//make onReady function that will load server data when DOM is ready
function onReady() {
  console.log('client.js is sourced!');
  axios
    .get('/calculations')
    .then((response) => {
      console.log('server data', response.data);
      //display data on the DOM
      //first find element to put the data
      const calcHistory = document.getElementById('resultHistory');
      //clear calcHistory
      calcHistory.innerHTML = ``;
      //loop calcHistory
      for (let calc of response.data) {
        calcHistory.innerHTML += `
        <ul>
            <li>${calc.num1} ${calc.operator} ${calc.num2} = ${calc.result}</li>
        </ul>
        `;
      }
    })
    .catch((error) => {
      console.error('Error in GET server data', error);
    });
}

//call onReady
onReady();

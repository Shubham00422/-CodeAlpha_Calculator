const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let expression = ''; // Yeh pura calculation (numbers aur operators) ko screen par dikhane ke liye store karega
let resultDisplayed = false;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    const action = button.getAttribute('data-action');

    // Display ko clear karne ke liye
    if (action === 'clear') {
      currentInput = '';
      expression = '';
      display.value = '';
      resultDisplayed = false;
    }
    
    // Akhri digit ko delete karne ke liye
    else if (action === 'delete') {
      currentInput = currentInput.slice(0, -1);
      expression = expression.slice(0, -1); // Expression se bhi akhri character hataye
      display.value = expression;
    }
    
    // Calculation perform karne ke liye
    else if (action === 'calculate') {
      if (expression) {
        try {
          const result = eval(expression); // Pura expression evaluate karega
          display.value = result;
          currentInput = result.toString(); // Result ko agle input ke liye store kare
          expression = result.toString(); // Result ke sath expression ko update kare
          resultDisplayed = true;
        } catch (e) {
          display.value = 'Error';
        }
      }
    }
    
    // Operators (+, -, *, /) ko handle karne ke liye
    else if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput) {
        expression += value; // Operator ko expression me add kare
        display.value = expression; // Updated expression ko screen par dikhaye
        currentInput = ''; // Agle number ke liye current input reset kare
        resultDisplayed = false;
      }
    }
    
    // Number ya Decimal input ke liye
    else {
      if (resultDisplayed) {
        currentInput = value; // Agar result display ho gaya to naya input start kare
        expression = value; // Expression bhi fresh start kare
        resultDisplayed = false;
      } else {
        currentInput += value; // Current input me value ko add kare
        expression += value; // Expression me value ko add kare
      }
      display.value = expression; // Pura expression ko screen par dikhaye
    }
  });
});

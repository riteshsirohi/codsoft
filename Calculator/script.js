// Selecting elements
const screen = document.querySelector('#screen');
const keys = document.querySelector('.calculator-keys');

// Variables to store current state
let currentInput = '0';
let previousInput = '';
let operator = '';

keys.addEventListener('click', (e) => {
    const { target } = e;
    const { value } = target;

    if (!target.matches('button')) return;

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value);
            break;
        case '=':
            calculate();
            break;
        case 'all-clear':
            clear();
            break;
        case '.':
            inputDecimal();
            break;
        default:
            inputDigit(value);
    }
    updateScreen();
});

function handleOperator(nextOperator) {
    if (operator && currentInput === '') return;

    if (previousInput === '') {
        previousInput = currentInput;
    } else if (operator) {
        calculate();
    }

    operator = nextOperator;
    currentInput = '';
}

function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }

    currentInput = result;
    operator = '';
    previousInput = '';
}

function clear() {
    currentInput = '0';
    previousInput = '';
    operator = '';
}

function inputDigit(digit) {
    if (currentInput === '0') {
        currentInput = digit;
    } else {
        currentInput += digit;
    }
}

function inputDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function updateScreen() {
    screen.value = currentInput;
}

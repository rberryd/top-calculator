const buttons = document.querySelectorAll('button');
const input = document.querySelector('input');
const currentOp = document.querySelector('.current-op');

let num1 = '';
let step = 0;
let op = '';

for(const btn of buttons) {
    btn.addEventListener('click', function() {
      switch(true) {
        case btn.classList.contains('num'):
            assignNumber(this.textContent);
            break;
        case btn.classList.contains('zero'):
            if(input.value != 0) {
                input.value += this.textContent;
            }
            break;
        case btn.classList.contains('decimal'):
            if(!/[.]/g.test(input.value)) {
                input.value += this.textContent;
            }
            break;
        case btn.classList.contains('delete'):
            deleteNum('delete');
            break;
        case btn.classList.contains('clear'):
            deleteNum('clear');
            break;
        case btn.classList.contains('operator'):
            assignOperator(this.textContent);
            break;
        case btn.classList.contains('equal'):
            if(step === 2) {
                step = 0;
                operate(parseFloat(num1), parseFloat(input.value), op);
                input.value = num1;
                currentOp.textContent = '';
            }
            break;
        case btn.classList.contains('convert'):
            if(input.value == '0') {
                break;
            } else if(!/[-]/g.test(input.value)) {
                input.value = `-${input.value}`;
            } else {
                input.value = input.value.replace('-', '');
            }
            break;
      }
    });
}

function assignNumber(num) {
    if(step === 0) {
        if(input.value === '0') {
            input.value = num;
        } else {
            input.value += num;
        }
    } else if(step === 1) {
        step = 2;
        input.value = num;
    } else if(step === 2) {
        input.value += num;
    }
}

function assignOperator(operator) {
    if(step === 0 && input.value != '0') {
        step = 1;
        num1 = input.value;
        input.value = '';
        op = operator;
        currentOp.textContent = `${num1}${operator}`;
    } else if(step === 2) {
        operate(parseFloat(num1), parseFloat(input.value), op);
        input.value = '';
        currentOp.textContent = `${num1}${operator}`;
        op = operator;
    }
}

function operate(firstNum, secondNum, operator) {
    if(operator === '+') {
        num1 = firstNum + secondNum;
    } else if(operator === '-') {
        num1 = firstNum - secondNum;
    } else if(operator === '*') {
        num1 = firstNum * secondNum;
    } else if(operator === '/') {
        num1 = firstNum / secondNum;
    }
}

function deleteNum(option) {
    if(option === 'clear') {
        input.value = '0';
        num1 = '';
        step = 0;
        op = '';
        currentOp.textContent = '';
    } else if(option === 'delete') {
        if(input.value.length == 1) {
            input.value = '0';
        } else {
            input.value = input.value.replace(input.value[input.value.length - 1], '');
        }
    }
}
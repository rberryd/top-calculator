let buttons = document.querySelectorAll('.input-btn');
let input = document.querySelector('#numInput');

const operators = ['+', '-', 'x', '÷'];

for(const button of buttons) {
    button.addEventListener('click', function() {
        switch(button.textContent) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                input.value += this.textContent;
                break;
            case '0':
                if(!input.value == '') {
                    input.value += this.textContent;
                }
                break;
            case '.':
                if(input.value == '') {
                    input.value += `0${this.textContent}`;
                } else if(!input.value.includes('.')) {
                    input.value += this.textContent;
                }
                break;
            case '=':
                operate(input.value);
                break;
            case 'Clear':
                input.value = '';
                break;
            case 'Delete':
                if(input.value == '0.') {
                    input.value = '';
                } else if(input.value.length > 0) {
                    input.value = input.value.replace(input.value[input.value.length - 1], "");
                }
                break;
        }
    });
}
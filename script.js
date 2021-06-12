/* Selectors & variables */

const result = document.getElementsByClassName('result')[0];
const buttons = document.getElementsByClassName('button');
const figures = document.getElementsByClassName('figure'); //lists all figures
const decimal = document.getElementsByClassName('decimal')[0];
const operations = document.getElementsByClassName('operation');
const equals = document.getElementById('equals');
const resetButton = document.getElementById('reset');

const values = ['','','']; // stores values and operation sign (valueOne, operationSign, valueTwo)
let valueIndex = 0;


/* Helper functions */

const reset = () => {
    values[0] = '0';
    values[1] = '';
    values[2] = '';
    valueIndex = 0;
}

const computeResult = () => {
    let valueOne = Number(values[0]);
    let valueTwo = Number(values[2]);
    let operationResult;
    switch(values[1]) {
        case '+':
            operationResult = valueOne + valueTwo;
            break;
        case '-':
            operationResult = valueOne - valueTwo;
            break;
        case 'x':
            operationResult = valueOne * valueTwo;
            break;
        case '/':
            operationResult = valueOne / valueTwo;
            break;
        default:
            operationResult = 'Error !'
            break;
    }
    result.textContent = operationResult;
    values[0] = operationResult;
    values[2] = '';
    valueIndex = 0;
}

/* Event Listeners */

//delete button
document.getElementById('button-del').addEventListener('click',
    () => {
        if(values[valueIndex].slice(0, -1).length === 0) {
            values[valueIndex] = "0";
        } else {
            values[valueIndex] = values[valueIndex].slice(0, -1)
        }
    });

//adds figure to value string
for (let i = 0; i < figures.length; i++) {
    figures[i].addEventListener(
        'click',
        () => {
            if (values[valueIndex] === "0") {
                values[valueIndex] = figures[i].firstChild.textContent;
            } else {
                values[valueIndex] += figures[i].firstChild.textContent;
            }
        }
    )
};

//adds decimal point
decimal.addEventListener('click', () => {
    if (!values[valueIndex].includes('.')) {
        values[valueIndex] += '.';
    }
})

//updates value/result showing
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {result.textContent = values[valueIndex]});
}

//assigns operation and sets valueIndex to 2
for (let i = 0; i < operations.length; i++) {
    operations[i].addEventListener('click', () => {
        if (values[2]) {
            computeResult();
        }
        values[1] = operations[i].textContent;
        valueIndex = 2;
    })
}

//computes operation and sets valueIndex back to 0
equals.addEventListener('click', () => {
    computeResult()
})

//resets actual calculation
resetButton.addEventListener('click', () => {
    reset();
    result.textContent = values[valueIndex];
})
const screen = document.getElementById('display');
const body = document.querySelector('body')
const resetBtn = document.getElementById('clear');
const equalSign = document.getElementById('equals');
const themeOne = document.querySelector('.theme-one');
const themeTwo = document.querySelector('.theme-two');
const themeThree = document.querySelector('.theme-three');
const toggleOne = document.querySelector('.toggle-one');
const toggleTwo = document.querySelector('.toggle-two');
const toggleThree = document.querySelector('.toggle-three');
const deleteBtn = document.querySelector('.delete');
let isPressed = false

themeOne.addEventListener('click', () => {
    body.classList.remove('theme-two');
    body.classList.remove('theme-three');
    toggleTwo.classList.add('hide');
    toggleThree.classList.add('hide');
    toggleOne.classList.remove('hide');
})

themeTwo.addEventListener('click', () => {
    body.classList.add('theme-two');
    body.classList.remove('theme-one');
    body.classList.remove('theme-three');
    toggleOne.classList.add('hide');
    toggleThree.classList.add('hide');
    toggleTwo.classList.remove('hide');
})
themeThree.addEventListener('click', () => {
    body.classList.add('theme-three');
    body.classList.remove('theme-one');
    body.classList.remove('theme-two');
    toggleOne.classList.add('hide');
    toggleTwo.classList.add('hide');
    toggleThree.classList.remove('hide');
})




const appendDisplay = input => {
    const regex = /[/*+-]+/
    const decRegex = /\.+/g

    const operatorRegex = /[/*+]/; // Matches operators except `-`

    // Handle consecutive operators
    if (/[/*+]/.test(screen.value.slice(-1)) && operatorRegex.test(input)) {
        // Replace the last operator if input is another operator (not `-`)
        screen.value = screen.value.slice(0, -1) + input;
        return;
    }

    if (/[-]/.test(screen.value.slice(-1)) && operatorRegex.test(input)) {
        // Handle cases like `5-+` → replace `+` but allow `-`
        screen.value = screen.value.slice(0, -1) + input;
        return;
    }


    if (input === '.') {
        const currentNumber = screen.value.split(regex).pop(); // Get the current number being entered
        if (currentNumber.includes('.')) {
            return; // Prevent adding another decimal
        }
    }
    
    screen.value += input;
    const decVal = screen.value.replace(decRegex, '.')
    screen.value = decVal;
    
    if(screen.value.startsWith('0')){
        screen.value = input
    }


    if(isPressed){
        isPressed = !isPressed;
        screen.value.match(regex) ? screen.value : screen.value = input;
    }

}

resetBtn.onclick = () => {
    screen.value = 0;
}

equalSign.onclick = () => {
    try{
        screen.value = eval(screen.value);
        isPressed = true;
        if(screen.value === (eval(screen.value)).toFixed(16)){
            screen.value = eval(screen.value).toFixed(4);
        } 
    }
    catch(error){
        screen.value = 'error'
        setTimeout(() => {
               screen.value = '' ;
        },1000)
    }
}

deleteBtn.onclick = deleteValue = () => {
    screen.value.length > 1 ? screen.value = screen.value.slice(0, -1): screen.value = ''
} 
//ADD A HISTORY BTN TO VIEW PAST CALCULATIONS 
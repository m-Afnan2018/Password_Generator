let temp;

const length = document.querySelector('#password-length-value');
const slider = document.querySelector('#slider');
const password = document.querySelector('#password');
const copy =  document.querySelector('#copy-button');
const copied = document.querySelector('#copied');
const strength =  document.querySelector('#strength-indicator');
const generate = document.querySelector('#generate-button');
const uppercase = document.querySelector('#upperCase');
const lowercase =  document.querySelector('#lowerCase');
const number = document.querySelector('#number');
const symbol = document.querySelector('#symbol');
const root = document.documentElement.style;

function getRandomUpperCase(){
    let min = 65;
    let max = min + 26;

    let random = Math.random();
    random = random * (max - min);
    random = random +  min;
    random = parseInt(random)
    return String.fromCharCode(random);
}

function getRandomLowerCase(){
    let min = 97;
    let max = min + 26;

    let random = Math.random();
    random = random * (max - min);
    random = random +  min;
    random = parseInt(random)
    return String.fromCharCode(random);
}

function getRandomNumber(){
    let random = Math.random();
    random = random * 10;
    random = parseInt(random)
    return  random;
}

function getRandomSymbol(){
    let possible = '~`!@#$%^&*()_-+={[}]|\:;<,>.?/';
    
    let random = Math.random();
    random = random * (possible.length);
    random = parseInt(random)
    return possible[random];
}

generate.addEventListener('click', generatePassword);
copy.addEventListener('click', displayCopied);

function generatePassword(){
    let possible = new   Array();

    let pass = '';

    if(uppercase.checked){
        pass+=getRandomUpperCase();
        possible.push(getRandomUpperCase);
    }
    if(lowercase.checked){
        pass+=getRandomLowerCase();
        possible.push(getRandomLowerCase);
    }
    if(number.checked){
        pass+=getRandomNumber();
        possible.push(getRandomNumber);
    }
    if(symbol.checked){
        pass+=getRandomSymbol();
        possible.push(getRandomSymbol);
    }

    if(possible.length==0){
        return;
    }

    curr_len=Math.max(possible.length , curr_len);
    length.innerText=curr_len;
    slider.value=curr_len;

    for(let i=0; i<curr_len-possible.length; i++){
        let random = Math.random();
        random = random * (possible.length);
        random = parseInt(random);

        let k = possible[random]();
        pass = pass + k;

    }
    
    pass = sufflePassword(pass);

    changeStrengthIndicator(pass, possible.length);
    
    password.value = `${pass}`;
}

function sufflePassword(password){
    let len=password.length;
    password = password.split('');
    for(let i=0; i<len; i++){
        let j = Math.random() * len;
        j = parseInt(j);

        let tmp = password[i];
        password[i] = password[j];
        password[j] = tmp;
    }
    return password.join('');
}

function changeStrengthIndicator(password, diff){
    if(password.length >= 12 || (password.length >= 8 && diff > 2)){
        root.setProperty('--shadow_color', '#ff0000');
    }
    else if(password.length >= 4 && diff > 2){
        root.setProperty('--shadow_color', '#00ff00');
    }
    else if(password.length >= 4){
        root.setProperty('--shadow_color', '#ffe53d');
    }
    else{
        root.setProperty('--shadow_color', '#cccccc');
    }
}

let curr_len = 10;

function changeLength(value){
    curr_len=value;
    length.innerText=value
}

async function displayCopied(){
    if(password.value.length != 0){
        copied.setAttribute('style', 'display:block');
        if (navigator.clipboard?.writeText) {
            try{
                await navigator.clipboard.writeText(password.value);
            }
            catch(e){
                copied.innerText='Error while Copying !!!';
            }
        }
        setTimeout(function(){copied.removeAttribute('style')}, 1000);
        if(copied.innerText != 'Copied'){
            copied.innerText = 'Copied';
        }
    }
}
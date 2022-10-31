//set variables

let displayLine=document.querySelector(".displayline");
let button=document.querySelectorAll("button");
let sum=document.querySelector(".sum");
let operater=document.querySelectorAll(".operater");
let number=document.querySelectorAll(".number");
let ac=document.querySelector(".allclear");
let clear=document.querySelector(".clear");
let point=document.querySelector(".point");

let firstNum="";
let nextNum="";
let operation="";


//eventListener

number.forEach(number=>number.addEventListener("click", ()=>{
    if(displayLine.innerHTML==="0") displayLine.innerHTML="";
    displayLine.innerHTML+=number.innerText;
}));

operater.forEach(operater=>operater.addEventListener("click",()=>{
    if(operation!==""){
        calculate();
    }
    firstNum=displayLine.innerHTML;
    operation=operater.innerHTML;
    displayLine.innerHTML=firstNum + operation;
    
}));

sum.addEventListener("click",()=>{
    if(operation==="") return;
    calculate();
    operation="";
});

ac.addEventListener("click",clearText);

clear.addEventListener("click",()=>{
    let removed=(displayLine.innerHTML).split("");
    removed.pop();
    displayLine.innerHTML=removed.join("");
 
});

point.addEventListener("click",()=>{
    checkPoint();
    displayLine.innerHTML+=point.innerText;
});




//functions

function calculate(){
    if((displayLine.innerHTML).split(operation).length>2){
        nextNum = (displayLine.innerHTML).split(operation)[2];
    }else{
        nextNum = (displayLine.innerHTML).split(operation)[1];
    }

    if(operation==="÷"&&nextNum==="0"){
        return displayLine.innerHTML="ERROR!";
    }
    displayLine.innerHTML=Math.round(operate(operation,firstNum,nextNum)*1000)/1000;
}


function clearText(){
    displayLine.innerHTML="0";
    firstNum="";
    nextNum="";
    operation="";
}


function checkPoint(){
    if(firstNum===""){
        if(displayLine.innerHTML.includes(".")) return;
    }else if(displayLine.innerHTML.split(operation).length>2&&
    displayLine.innerHTML.split(operation)[2].includes(".")){
        return;
    }
}



function add(a, b) {
    return a + b;
}
  
function substract(a, b) {
    return a - b;
}
  
function multiply(a, b) {
    return a * b;
}
  
function divide(a, b) {
    return a / b;
}

function operate(operater,a,b){
    a = Number(a);
    b = Number(b);
    switch(operater){
        case "+":
            return add(a,b);
        case "-":
            return substract(a,b);
        case "×":
            return multiply(a, b);
        case "÷":
            if(b===0) return null;
            return divide(a, b);
        default:
            return null
    }
}


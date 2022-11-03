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

//to lose focus on a button clicked
button.forEach(btn=>btn.addEventListener("click",()=>{
    btn.blur();
}));

number.forEach(number=>number.addEventListener("click", ()=>{
    appendNum(number.innerHTML);
}));

operater.forEach(operater=>operater.addEventListener("click",()=>{
    setOperation(operater.innerHTML)
}));

sum.addEventListener("click",getResult);

ac.addEventListener("click",clearText);

clear.addEventListener("click",()=>{
    removeLastChar();
});

point.addEventListener("click",checkPoint);


window.addEventListener('keydown', (e)=>{
    if(!isNaN(e.key)) appendNum(e.key);
    if(e.key==="+"|| e.key==="-"|| e.key==="*"|| e.key==="/") setOperation(convert(e.key));
    if(e.key==="="|| e.key==="Enter") getResult();
    if(e.key==="Backspace") removeLastChar();
    if(e.key===".") checkPoint();
});




//functions
    
function appendNum(number){
    if(displayLine.innerHTML==="0") displayLine.innerHTML="";
    displayLine.innerHTML+=number;
}
    
function setOperation(operater){
    if(operation!==""){
        calculate();
    }
    firstNum=displayLine.innerHTML;
    operation=operater;
    displayLine.innerHTML=firstNum + operation;
}
    
function getResult(){
    if(operation==="") return;
    calculate();
    operation="";
}

function calculate(){
    if((displayLine.innerHTML).split(operation).length>2){
        nextNum = (displayLine.innerHTML).split(operation)[2];
    }else{
        nextNum = (displayLine.innerHTML).split(operation)[1];
    }    
    if(operation==="÷"&&nextNum==="0"){
        return displayLine.innerHTML="ERROR!";
    }
    result=Math.round(operate(operation,firstNum,nextNum)*1000)/1000;
    displayLine.innerHTML=result;
}
        
function clearText(){
    displayLine.innerHTML="0";
    firstNum="";
    nextNum="";
    operation="";
}
    
function removeLastChar(){
    let removed=(displayLine.innerHTML).split("");
    let popped=removed.pop();
    if(popped==="+"|| popped==="-"|| popped==="×"|| popped==="÷"){
        operation="";
    }
    displayLine.innerHTML=removed.join("");
}
    
    
function checkPoint(){
    if(firstNum===""){
        if(displayLine.innerHTML.includes(".")) return;
    }else if(displayLine.innerHTML.split(operation).length>2&&
    displayLine.innerHTML.split(operation)[2].includes(".")){
        return;
    }else if(displayLine.innerHTML.split(operation).length===2&&
        displayLine.innerHTML.split(operation)[1].includes(".")){
        return;
    }
    displayLine.innerHTML+=point.innerText;
}

function convert(operater){
    if(operater==="+") return "+"
    if(operater==="-") return "-"
    if(operater==="*") return "×"
    if(operater==="/") return "÷"
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


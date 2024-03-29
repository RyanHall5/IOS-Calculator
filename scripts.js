let nums = document.querySelectorAll(".num");
let ops = document.querySelectorAll(".op");

let divide = document.getElementById("divide");
let multiply = document.getElementById("multiply");
let subtract = document.getElementById("subtract");
let add = document.getElementById("add");

let equals = document.getElementById("equals");
let clear = document.getElementById("clear");
let percent = document.getElementById("percent");
let posNeg = document.getElementById("posNeg");
let decimal = document.getElementById("decimal");

let display = document.getElementById("display");

//global variables
let displayText = "0";
let opPressed = false;
let previousValue;
let currentOperation;
let onSecondNum=false;

for (let i=0; i<nums.length; i++){
  nums[i].addEventListener("click", function(){
    if (!opPressed){
      if (displayText == "0"){
        displayText = nums[i].textContent;
        console.log("run3");
      }
      else{
        displayText += nums[i].textContent;
        console.log("run4");
      }
    }
    else{
      if (!onSecondNum){
        displayText = nums[i].textContent;
        changeColor(currentOperation, true);
        onSecondNum = true;
        console.log("run5");
      }
      else{
        if (displayText == "0"){
          displayText = nums[i].textContent;
          console.log("run6");
        }
        else{
          displayText += nums[i].textContent;
          console.log("run7");
        }
      }
    }
    
    updateDisplay();
  })
}

clear.addEventListener("click", function(){
  if (displayText!="0"){
    displayText = "0";
    display.textContent = "0";
  }
  else{
    if (opPressed)
      changeColor(currentOperation, true);
  }
});


for (let i=0; i<ops.length; i++){
  ops[i].addEventListener("click", function(){
    //recording that an operator is pressed and which operator
    if (!opPressed)
      opPressed = true;
    else
      changeColor(currentOperation, true);
    currentOperation = ops[i];

    //changing color of button
    changeColor(ops[i]);

    //recording number before operator was pressed
    if (displayText != null){
      previousValue = Number(displayText);  
      console.log("run1");
    }
    else{
      previousValue = null;
      console.log("run2");
    }
  });
}

equals.addEventListener("click", function(){
  if (previousValue != null && displayText != null){
    switch (currentOperation){
      case ops[0]:
        if (displayText != "0")
          displayText = previousValue / Number(displayText);
        else
          displayText = null;
        console.log("run");
        break;
      case ops[1]:
        displayText = previousValue * Number(displayText);
        console.log("run mult");
        break;
      case ops[2]:
        displayText = previousValue - Number(displayText);
        break;
      case ops[3]:
        displayText = previousValue + Number(displayText);
        break;
    }
  }
  else{
    displayText = null;
  }
  updateDisplay();
  onSecondNum = false;
  opPressed = false;
});

percent.addEventListener("click", function(){
  displayText = (Number(displayText)/100).toString();
  display.textContent = displayText;
});

posNeg.addEventListener("click", function(){
  displayText = (Number(displayText) * -1).toString();
  display.textContent = displayText;
});

decimal.addEventListener("click", function(){
  if (displayText.indexOf(".") == -1){
    displayText += ".";
    display.textContent = displayText;
  }
});

function changeColor(button, alreadyPressed=false){
  if (!alreadyPressed){
    button.style.color = "#FF9501";
    button.style.backgroundColor = "white";
  }
  else{
    button.style.color = "white";
    button.style.backgroundColor = "#FF9501";
  }
}

function updateDisplay(){
  num = Number(displayText);
  if (num>99999999){
    display.textContent = "Too Big";
  }
  else if (displayText == null){
    display.textContent = "Error";
  }
  else{
    num = Number(num.toFixed(7));
    displayText = num.toString();
    display.textContent = displayText;
  }
}

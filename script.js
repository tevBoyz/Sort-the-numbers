var disp = document.getElementById("numDisplay");
var boxes = document.getElementsByClassName('box');
var button = document.getElementById('start_reset_button');
var clickedBox = undefined;
var started = false;
let num = 0;
let prev = 0;

var trackingArr = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]



function start(){
    randomize();
    started = true;
    updateButton();
}

function reset(){
    resetBoxes();
    trackingArr = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    start();
}

function checkArray(){
    let arr = (trackingArr.indexOf(-1) !== -1) ? truncateArr() : trackingArr;
    console.log(arr);

    return isAscending(arr);
}

function isAscending(arr) {
    let isAsc = true;
    let i = 0
    for(i=0; i < arr.length-1; i++){
        if(arr[i] >= arr[i+1]){
            isAsc = false;
            break;
        }
    }
    let won = (isAsc && (arr.length == trackingArr.length))
    return [isAsc, arr[i], won];
}

function truncateArr(){
    let res = [];
    for (let i = 0; i < trackingArr.length; i++){
        if(trackingArr[i] != -1){
            res.push(trackingArr[i]);
        }
    }
    return res;
}


function resetBoxes(){
    for(let i = 1; i <= 20; i++){
        document.getElementById(""+i+"").innerHTML = "---";
        document.getElementById(""+i+"").classList.remove("red");
    }
}

function setBoxes(){
    for(let i = 1; i <= 20; i++){
        document.getElementById(""+i+"").innerHTML = (trackingArr[i-1] != -1) ? trackingArr[i - 1] : '---';
    }
}

function updateButton(){
    if(started){
        button.innerHTML = "Reset";
        button.removeAttribute('onClick');
        button.setAttribute('onClick', 'reset()');
    }
    else{
        button.innerHTML = "Start";
        button.removeAttribute('onClick');
        button.setAttribute('onClick', 'start()');
    }
}

function reply_click(id){
    console.log("clicked " +id);
    clickedBox = document.getElementById(""+id+"")
    if ((num != 0) && (clickedBox.innerHTML == '---'))
    {
        clickedBox.innerHTML = num;
        trackingArr[id-1] = num;
        console.log(checkArray());
        if(checkArray()[0]){
            if(checkArray()[2]){
                alert("You Won! The list is sorted");
            }
            else{
                randomize();
            }
        }
        else{
            let postionFailed = trackingArr.indexOf(checkArray()[1]);
            document.getElementById(""+ (postionFailed+1) +"").classList.add("red");
            alert("Sorting failed");
        }
        
    }
    else if(num == 0){
        alert("Start the game first");

    }

    else if(clickedBox.innerHTML != '---'){
        alert("Position " +id+ " is already taken.");

    }
}

function randomize(){
    prev = num;
    num = random4Digit();
    animateValue(disp, num - 200, num, 1000);}

function random4Digit(){
    return shuffle( "123456789".split('') ).join('').substring(0,3);
}
  
function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
}
  

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
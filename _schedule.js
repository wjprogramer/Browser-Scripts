// ref: https://www.itread01.com/p/1421631.html

var tHours    = 0;
var tMinutes  = 0;
var tSeconds  = 0;
var timer     = null;

function schedule(hours, minutes, seconds) {
  tHours = hours;
  tMinutes = minutes;
  tSeconds = seconds;
  // TODO check..
  run();
}

function run() {
  var date = new Date();

  if(checkTargetTime(date) && (date.getMilliseconds() < 3)) {
    toDo();
    window.clearTimeout(timer);
  } else if(compareTargetTime(date) && date.getMilliseconds() >= 3) { 
    var pathname = location.pathname;
    // do something if match route
    window.clearTimeout(timer);
  } else {
    timer = window.setTimeout(run, 1);
  }
}

/* --------------------------------------------------------- */
function toDo() {
  //Add your operation here
  console.log('do some thing');
}
/* --------------------------------------------------------- */

function checkTargetTime(date) {
  return (date.getHours() - tHours == 0)     && 
         (date.getMinutes() - tMinutes == 0) && 
         (date.getSeconds() - tSeconds == 0);
}

function compareTargetTime(date) {
  //debug:console.log('compare target time');
  return (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()) 
        >= (tHours * 3600 + tMinutes * 60 + tSeconds);
}

// 執行腳本
function runScript() {
  console.log('start running script');
  schedule(tHours, tMinutes, tSeconds);
}

runScript();
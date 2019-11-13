// ==UserScript==
// @name       威秀搶票
// @namespace   Violentmonkey Scripts
// @grant       none
// @version     1.0
// @author      -
// @description 2019/11/13 上午10:29:52
// ==/UserScript==

// ref: https://www.itread01.com/p/1421631.html
// 威秀首頁和訂票網頁是不同的 ----@match       https://sales.vscinemas.com.tw/*

// ref: https://www.itread01.com/p/1421631.html

var tHours    = 12;
var tMinutes  = 0;
var tSeconds  = 0;
var timer     = null;

// 電影頁面- 電影選影廳種類、場次那個頁面
var movieUrl = 'http://www.vscinemas.com.tw/vsTicketing/ticketing/ticket.aspx?cinema=1|TP&movie=HO00008497';
// 場次
var ticketUrl = 'http://www.vscinemas.com.tw/vsTicketing/ticketing/ticket.aspx?cinema=1|TP&movie=HO00008497#';

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
  	// 跳轉頁面
    window.location.href = movieUrl;
    window.clearTimeout(timer);
  } else if(compareTargetTime(date) && date.getMilliseconds() >= 3) { 
    var pathname = location.pathname;
    // do something if match route
    if (pathname == '/vsTicketing/ticketing/ticket.aspx' || pathname == '/vsTicketing/ticketing/iframeContent/_ticketInfo.htm') {
    	chooseTime();
    } else if (pathname == '/vsTicketing/ticketing/booking.aspx') {
    	bookTicket();
    } else if (pathname == '/LiveTicket/') {

    } else {

    }


    window.clearTimeout(timer);
  } else {
    timer = window.setTimeout(run, 1);
  }
}

/* --------------------------------------------------------- */
// 選擇場次
function chooseTime() {
	// var as = document.getElementsByTagName("a");
	// for (index in as) {
	// 	if (as[index].href == ticketUrl) {
	// 		as[index].click();
	// 	}
	// }
	document.querySelector('a[href="'+ ticketUrl +'"]').click();
}

// 選擇票種
function bookTicket() {
	document.querySelector('a[href="#bookNormal"]').click();
	document.querySelector('input[name="agree"]').checked = true;
	document.querySelector('div#bookNormal > form > section > input[type="submit"]').click();
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
  console.log('time - ' + tHours + ':' + tMinutes + ':' + tSeconds);
  schedule(tHours, tMinutes, tSeconds);
}

runScript();
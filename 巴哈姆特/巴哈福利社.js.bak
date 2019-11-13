// ==UserScript==
// @name 巴哈福利社-通用
// @description
// @namespace Violentmonkey Scripts
// @match https://fuli.gamer.com.tw/*
// @grant none
// ==/UserScript==

/*
  
  巴哈有分幾種，此為通用? (測試不多)
  注意: 巴哈有時候會改按鈕名稱，請記得改btnClassName，並且如果畫面出現兩個同class的btn，請用innerHtml判斷
  
  流程: 初始頁面 shop_detail.php -> 時間到 F5 -> 點要兌換按鈕 -> buyT.php 填入基本資料
 */

// ref: https://www.itread01.com/p/1421631.html

var btnClassName = 'BF-sendbtn'

var tHours    = 16;
var tMinutes  = 23;
var tSeconds  = 15;
var timer     = null;

var tName     = '吳偉傑';
var tTel      = '0979585517'
var tAddr     = '台北市中山區德惠街9號5樓'

function schedule(hours,minutes,seconds) {
  console.log('schedule');
  tHours = hours;
  tMinutes = minutes;
  tSeconds = seconds;
  // TODO check..
  run();
}

function run() {
  var date = new Date();

  if(checkTargetTime(date) && (date.getMilliseconds() < 3)) {
    // 重整畫面
    location.reload();
  } else if(checkTargetTime(date) && date.getMilliseconds() >= 3) {
    var pathname = location.pathname;
    if (pathname == '/shop_detail.php') {
      goExchange();
    } else if (pathname == '/buyT.php') {
      buy();
      window.clearTimeout(timer); 
    }
  } else {
    timer = window.setTimeout(run, 1);
  }
}

// ===== 流程 =====
// 1. 點「我要兌換」按鈕
function goExchange() {
  // 這一行也可以用，如果巴哈讓'BF-sendbtn'變多了，可以透過text指定
  // document.getElementsByClassName('BF-sendbtn')[0].innerHTML == '我要兌換'
  document.getElementsByClassName(btnClassName)[0].click();
}

// 2. 購買頁面
function buy() {
  document.querySelector('input[name="name"]').value = tName;
  document.querySelector('input[name="tel"]').value = tTel;
  document.querySelector('input[name="addr"]').value = tAddr;
  
  document.querySelector('input[name="agree"]').checked  = true;
  
  // document.getElementsByClassName('BF-sendbtn')[0].innerHTML == '確認兌換'
  document.getElementsByClassName(btnClassName)[0].click();
}

function checkTargetTime(date) {
  return (date.getHours() - tHours == 0)     && 
         (date.getMinutes() - tMinutes == 0) && 
         (date.getSeconds() - tSeconds == 0);
}

// 執行腳本
function runScript() {
  console.log('start running script');
  schedule(tHours, tMinutes, tSeconds);
}

runScript();




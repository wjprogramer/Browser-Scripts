// ==UserScript==
// @name        New script - coolpc.com.tw
// @namespace   Violentmonkey Scripts
// @match       https://www.coolpc.com.tw/evaluate.php
// @grant       none
// @version     1.0
// @author      -
// @description 2021/10/2 21:01:26
// ==/UserScript==

// #region Utils
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// #endregion


var style = document.createElement('style');
style.type='text/css';
style.id="jayCss"

function toggleDetails(id) {
  var gs = document.querySelectorAll(`.td_${id}_group`);

  for (var g of gs) {
    if (g.style.display == 'none') {
      g.style.display = '';
    } else {
      g.style.display = 'none';
    }
  }
}

var tds;
// js change style
var changeStyle = async() => {
  await sleep(2000);
  // 調整欄寬
  var colgroup = document.querySelector('#Tfix colgroup');
  colgroup.childNodes[0].width = 30;
  colgroup.childNodes[1].width = 160;

  var tds0 = document.querySelectorAll('#Tfix tr td:nth-child(1)');
  for (var t of tds0) {
    t.style.verticalAlign = 'top';
  }

  var tds1 = document.querySelectorAll('#Tfix tr td:nth-child(2)');
  for (var t of tds1) {
    t.style.verticalAlign = 'top';
  }

  // 顯示商品
  tds = document.querySelectorAll('#Tfix tr td:nth-child(3)');
  var skippedRowIndices = [
    1, // 品牌小主機 AIO | VR
    2, // 手機 平板 筆電 穿戴
    3, // PC 套裝
    13, // 螢幕
    17, // 鍵盤 滑鼠 搖桿
    18, // 滑鼠 鼠墊
    19, // IP分享器
    20, // 網路NAS
    21, // 音效卡
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
  ];
  for (var i = 0; i < tds.length; i++) {
    var needSkip = skippedRowIndices.indexOf(i) != -1;
    if (needSkip) {
      continue;
    }

    var td = tds[i];
    var td_class_group = `td_${i}_group`;
    // toggleDetails('${td_id}')
    td.innerHTML = td.innerHTML + `<div><button id="button_${i}" type="button" onclick="">顯示/隱藏</button></div>`; 
    // let btn = document.createElement("button");
    // btn.innerHTML = "顯示/隱藏";
    // btn.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   toggleDetails('${td_id}');
    // });
    // td.appendChild(btn);


    var optgroups = td.querySelectorAll('optgroup');
    var res = '';

    if (optgroups) {
      for (var optgroup of optgroups) {
        var selects = optgroup.querySelectorAll('option');
        var bgColor = optgroup.style.backgroundColor;
        // console.log('==================');
        // console.log(optgroup);

        var groupHTML = '';
        if (selects) {
          for (var select of selects) {
            groupHTML += select.innerHTML + '<br/>';
          }
        }
        if (groupHTML != '') {
          groupHTML = `
            <div class="${td_class_group}" style="background-color: ${bgColor}; display: none;">${groupHTML}</div>
          `;
          res += groupHTML;
        }
      }
    }

    td.innerHTML = td.innerHTML + res;
  }

  var _addEventListen = (button, index) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDetails(index);
    });
  }

  for (var k = 0; k < tds.length; k++) {
    var button = document.querySelector(`#button_${k}`);
    if (button) {
      _addEventListen(button, k);
    }
  }

  var _addEventOnOption = () => {
    
  }

  // var ths = document.querySelectorAll('th');
  // for (var th of ths) {
  //   if (th.width == '22') {
  //     th.width = '';
  //   }
  // }
}

changeStyle();

// ------------
var interval = window.setInterval(
  (() => appendMyStyle()), 
  200
);

appendMyStyle = () => {
  if (style.styleSheet) {
      style.styleSheet.cssText = css;
  } else {
      style.appendChild(document.createTextNode(css));
  }
  console.log("[JAY] setting");
}

// ------------
timeout = () => {
  clearInterval(interval);
  console.log("[JAY] clear interval");
}
setTimeout(timeout, 1000);

document.getElementsByTagName('head')[0].appendChild(style);

var css = `
#hid {
  margin-bottom: 8px;
}

#Tfix td {
  padding: 4px;
}

#Tfix th {
  padding: 4px;
}

#Tfix tbody:nth-child(3) {

}

#Ttitle {
  margin-bottom: 8px;
}

#Ttitle tbody tr:nth-child(2) div nobr {
  display: none;
}
`;
// ==UserScript==
// @name        ktor.io style
// @namespace   Violentmonkey Scripts
// @match       *://ktor.io/*
// @grant       none
// @version     1.0
// @author      -
// @description 2020/11/22 下午5:30:55
// ==/UserScript==

var style = document.createElement('style');
style.type='text/css';
style.id="jayCss"

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
.toc-item--selected {
  color: #3bbeff;
}

.toc-icon--opened {
  fill: #ffbb00;
  scale: 1.5;
}

.toc-icon {
  scale: 1.5;
}
`;
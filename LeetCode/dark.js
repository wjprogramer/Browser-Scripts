// ==UserScript==
// @name     LeetCode Dark Theme
// @version  1
// @grant    none
// @include  /^https?://leetcode\.com/.*$/
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
.side-tools-wrapper__1TS9, body {
  background-color: #18191A;
}

div[data-cy=description-content] *, div[data-cy=submissions-content] * {
  color: #cfba78;
}

div[data-cy=question-title] {
  color: white;
}

div[data-cy=description-content] pre {
  color: #263238 !important;
  background-color: #f7f9fa;
}

div[data-cy=description-content] pre * {
  color: #263238 !important;
}

div[data-cy=description-content] code {
  color: #263238 !important;
}

div[data-cy=description-content] code * {
  color: #263238 !important;
}

table {
	background-color: lightblue;
}
`;
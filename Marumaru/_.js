// ==UserScript==
// @name        New script - jpmarumaru.com
// @namespace   Violentmonkey Scripts
// @match       https://www.jpmarumaru.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 2021/2/14 下午12:15:14
// ==/UserScript==
var enableFollow = true;

// ref: https://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document
function getCoords(elem) { // crossbrowser version
	var box = elem.getBoundingClientRect();

	var body = document.body;
	var docEl = document.documentElement;

	var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

	var clientTop = docEl.clientTop || body.clientTop || 0;
	var clientLeft = docEl.clientLeft || body.clientLeft || 0;

	var top  = box.top +  scrollTop - clientTop;
	var left = box.left + scrollLeft - clientLeft;

	return { top: Math.round(top), left: Math.round(left) };
}

const startFollowLyrics = () => {
	setInterval(() => {
		if (!enableFollow) {
			return;
		}

		try {
			var es = document.getElementsByClassName("LyricsYomiKana");
			for (let e of es) {
				if (e.style.color === "blue") {
					document.documentElement.scrollTop = document.body.scrollTop = e.parentNode.offsetTop - 400
				}
			}
		} catch(e) {
			console.error(e);
		}
	}, 500);
}

function copyText(text) {
	// 创建一个临时的textarea元素
	var textarea = document.createElement("textarea");
	// 设置textarea的值为要复制的文本
	textarea.value = text;
	// 将textarea元素添加到页面上
	document.body.appendChild(textarea);
	// 选择textarea中的文本
	textarea.select();
	// 执行复制命令
	document.execCommand("copy");
	// 移除临时的textarea元素
	document.body.removeChild(textarea);
}

const createButtons = () => {
	const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.bottom = '80px';
  container.style.left = '20px';
  container.style.zIndex = '99999999';
  container.style.backgroundColor = '#f2f2f2';
  container.style.padding = '10px';
  container.style.border = '1px solid #ccc';
	container.style.display = 'flex';
	container.style.flexDirection = 'column';

	const toggleButton = document.createElement('button');
  toggleButton.innerText = '啟用中';
	toggleButton.addEventListener('click', () => {
		enableFollow = !enableFollow;
		toggleButton.innerText = enableFollow ? '啟用中' : '禁用中';
  });
	container.appendChild(toggleButton);

	const copyHeaderButton = document.createElement('button');
  copyHeaderButton.innerText = '複製標題與連結';
	copyHeaderButton.addEventListener('click', () => {
		const headerMetaText = document.querySelector('.main-title').innerText
		copyText(`## [${headerMetaText}](${location.href})`);
  });
	container.appendChild(copyHeaderButton);

	const titleDiv = document.createElement('div');
	titleDiv.innerText = document.querySelector('.main-title').innerText;
	container.appendChild(titleDiv);

	document.body.appendChild(container);
}

const initPlayer = () => {
	const cdPlayer = document.querySelector('#divMain');
	const ytPlayer = document.querySelector('#divVideo');

	if (cdPlayer) {
		cdPlayer.style.minHeight = '';
		cdPlayer.style.zIndex = '999';
	} else if (ytPlayer) {
		ytPlayer.style.zIndex = '999';
	}
}

const updatePlayer = () => {
	const cdPlayer = document.querySelector('#divMain');
	const ytPlayer = document.querySelector('#divVideo');

	if (cdPlayer) {
		cdPlayer.style.position = '';
		cdPlayer.style.top = '';
		cdPlayer.style.left = '';

		const pos = getCoords(cdPlayer);
		cdPlayer.style.position = 'fixed';
		cdPlayer.style.top = '0px';
		cdPlayer.style.left = `${pos.left}px`;
	} else if (ytPlayer) {
		ytPlayer.style.position = '';
		ytPlayer.style.top = '';
		ytPlayer.style.left = '';

		const pos = getCoords(ytPlayer);
		ytPlayer.style.position = 'fixed';
		ytPlayer.style.top = '0px';
		ytPlayer.style.left = `${pos.left}px`;
	}
}

window.addEventListener('resize', () => {
	updatePlayer();
});

window.onload = () => {
	if (location.pathname.startsWith('/tw/JPSongPlay-')) {
		startFollowLyrics();
		createButtons();

		const topLyrics = document.querySelector('#divLyrics');
		topLyrics.style.display = 'none';

		initPlayer();
		updatePlayer();
	}
}

var jay_interval = setInterval(() => {
	try {
		var es = document.getElementsByClassName("LyricsYomiKana");
		for (let e of es) {
			if (e.style.color === "blue") {
				document.documentElement.scrollTop = document.body.scrollTop = e.parentNode.offsetTop - 200
			}
		}
	} catch(e) {
		console.error(e);
	}
}, 500);
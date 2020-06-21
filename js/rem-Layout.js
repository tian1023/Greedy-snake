(function() {
	function xys() {
		var html = document.querySelector("html");
		html.className = "";
		var userAgent = navigator.userAgent;
		if(userAgent.indexOf("iPhone") != -1) {
			html.classList.add("iphone");
		} else if(userAgent.indexOf("Android") != -1) {
			html.classList.add("android");
		} else if(userAgent.indexOf("iPad") != -1) {
			html.classList.add("ipad");
		} else {
			html.classList.add("pc");
		}

		if(window.innerWidth < 640) {
			html.classList.add("lt640");
			html.classList.add("lt960");
			html.classList.add("lt1000");
		} else if(window.innerWidth < 960) {
			html.classList.add("gt640");
			html.classList.add("lt960");
			html.classList.add("lt1000");
		} else if(window.innerWidth < 1000) {
			html.classList.add("gt640");
			html.classList.add("gt960");
			html.classList.add("lt1000");
		} else {
			html.classList.add("gt640");
			html.classList.add("gt960");
			html.classList.add("gt1000");
		}

		//rem布局
		var screenWidth = window.innerWidth;
		var danwei = screenWidth /3.75;
		var html = document.querySelector("html");
		html.style.fontSize = danwei + "px";

	}
	xys();
	window.onresize = function() {
		xys();
	}

})()
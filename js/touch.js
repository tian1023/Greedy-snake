var touchEvent={
	eventAll: {
		//eventName:['fn','fn1','fn2']
	},
	init: function(dom) {
		dom.eventAll = {};
		dom.addEvent = this.addEvent;
		dom.emit = this.emit;
		dom.removeEvent = this.removeEvent;
		dom.touchData = {};

		dom.addEventListener("touchstart", function(e) {
			this.touchData.startX = e.touches[0].pageX;
			this.touchData.startY = e.touches[0].pageY;
		})
		dom.addEventListener("touchmove", function(e) {
			this.touchData.endX = e.touches[0].pageX;
			this.touchData.endY = e.touches[0].pageY;
		})
		dom.addEventListener("touchend", function(e) {
			var x = this.touchData.endX - this.touchData.startX;
			var y = this.touchData.endY - this.touchData.startY;
			if((Math.abs(x) > Math.abs(y)) && Math.abs(x) > 100) {
				if(x > 0) {
					e.swiperDir = "swiperRight";
					dom.emit("swiperRight", e)
				} else {
					e.swiperDir = "swiperLeft";
					dom.emit("swiperLeft", e)
				}
			} else if((Math.abs(x) < Math.abs(y)) && Math.abs(y) > 100) {
				if(y > 0) {
					e.swiperDir = "swiperDown";
					dom.emit("swiperDown", e)
				} else {
					e.swiperDir = "swiperUp";
					dom.emit("swiperUp", e)
				}
			}
		})
	},
	addEvent: function(eventName, callbackFn) {
		if(this.eventAll[eventName] == undefined) {
			this.eventAll[eventName] = [];
		}
		this.eventAll[eventName].push(callbackFn);
	},
	emit: function(eventName, eventMsg) {
		if(this.eventAll[eventName] != undefined) {
			this.eventAll[eventName].forEach(function(item, i) {
				item(eventMsg);
			})
		}
	},
	removeEvent: function(eventName, callbackFn) {
		var that = this;
		this.eventAll[eventName].forEach(function(item, i) {
			if(item == callbackFn) {
				that.eventAll[eventName].splice(i, 1);
			}
		})
	}
}
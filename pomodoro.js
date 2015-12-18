// Pomodoro Timer

var sessionMins = 25;
var breakMins = 5;
var sound = new Audio('http://www.timrizzo.com/pomodoro/bell.mp3');

// ---Timer Constructor---

function Countdown(totalMins, name, counterName, alert) {	
  this.counterName = counterName;
  this.totalMins = totalMins;
  this.minutes = totalMins;
  this.seconds = 0;
  this.target_id = "#timer";
  this.name = name;
  this.switch = false;  
  this.alert = alert;
}

// Initialize 

Countdown.prototype.init = function(minutes) {
  this.alert.play();
  this.switch = false;
  this.minutes = minutes;
  this.seconds = 0;
  this.counter = setInterval(this.name + ".tick()", 1000);
}

// Reset

Countdown.prototype.reset = function() {
  clearInterval(this.counter);
  this.switch = false;
  this.minutes = this.totalMins;
  this.seconds = 0;
}

// Tick

Countdown.prototype.tick = function() {
  if (this.minutes > 0) {
    if (this.seconds > 0) {
      this.seconds--;
    } else {
      this.minutes--;
      this.seconds = 59;
    }
  } else {
    if (this.seconds > 0) {
      this.seconds--;
    } else {
      this.switch = true;
      $("#switch").trigger("click");
      return;
    }
  }
  this.updateCounter();
  this.updateTitle();
}

// Update Counter

Countdown.prototype.updateCounter = function() {
  if (this.seconds < 10) {
    this.seconds = "0" + this.seconds;
  }
  if (this.minutes != this.totalMins) {
    document.getElementById("timer").innerHTML = this.minutes + ":" + this.seconds;
  } else {
    document.getElementById("timer").innerHTML = "#/#";
  }
}

// Update Title

Countdown.prototype.updateTitle = function() {
  if (this.minutes != this.totalMins) {
    document.getElementById("title").innerHTML = "Time in " + this.counterName;
  } else {
    document.getElementById("title").innerHTML = "Begin Session";
  }
}

timer = new Countdown(sessionMins, "timer", "Session", sound);
timer2 = new Countdown(breakMins, "timer2", "Break", sound);

// ---Event Handlers---

// Session Increment

$("#s-time").click(function() {
  if (sessionMins < 60) {
    sessionMins += 5;
  } else if (sessionMins >= 60) {
    sessionMins = 5;
  }
  timer.totalMins = sessionMins;
  document.getElementById("timer").innerHTML = sessionMins + "/" + breakMins;
});

// Break Increment

$("#b-time").click(function() {
  if (breakMins < 20) {
    breakMins += 5;
  } else if (breakMins >= 20) {
    breakMins = 5;
  }
  timer2.totalMins = breakMins;
  document.getElementById("timer").innerHTML = sessionMins + "/" + breakMins;
});

// Start/Reset Timer

$("button").click(function(event) {
  if (timer.minutes === sessionMins && timer2.minutes === breakMins) {
    timer.reset();
    timer.init(sessionMins);
  } else {
    timer.reset();
    timer2.reset();
    timer.updateTitle();
    document.getElementById("timer").innerHTML = sessionMins + "/" + breakMins;
  }
});

$("#switch").click(function(event) {
  if (timer.minutes === sessionMins) {
    timer2.switch = true;
  } else {
    timer.switch = true;
  }
  if (timer.switch == true) {
    timer.reset();
    timer2.init(breakMins);
  } else if (timer2.switch == true) {
    timer2.reset();
    timer.init(sessionMins);
  }
});

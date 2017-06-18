window.s = {};
s.interactive = true;

s.focus = function(fram, dir) {
  s.a.map(function(el){removeClasses(el, ["focused", "previous"])});
  s.a.slice(0,max(0,fram))
    .map(function(beforeEl){addClass(beforeEl, "revealed");
			    removeClass(beforeEl, "hidden")});
  if (dir == "down") {
    s.a.slice(fram -1, fram)
      .map(function(prevEl){addClass(prevEl, "previous")})
  }

  s.a.slice(fram, -1)
    .map(function(afterEl){addClass(afterEl, "hidden")});

  var focusedFram = s.a[fram];
  addClass(focusedFram, "focused");
  removeClasses(focusedFram, ["previous","revealed","hidden"]);

  s.keepInView(focusedFram);
}

s.focusNext = function(){
  if (s.fram  >= s.a.length-1) {} // last el: noop 
  else {s.fram += 1; s.focus(s.fram, "down")}
}

s.focusPrevious = function(){
  if (s.fram <= 0) {}
  else {s.fram -= 1; s.focus(s.fram, "up") }
}

s.keepInView = function(el) {
  var o = el.getBoundingClientRect();
  if (o.y < 0) { 
    // element's top is above viewport, scroll up and add breath
    window.scrollBy(0, o.y - o.height);
  } else if (o.y < o.height) {
    // we are too close to the top, the previous frame is probably
    // not visible. Pull up and add extra breath
    window.scrollBy(0, o.height * (-1));
  } else if (o.bottom > window.innerHeight) { 
    window.scrollBy(0, o.bottom - window.innerHeight + o.height);
  }
}

s.disable = function(){
	s.interactive = false;
	s.a.map(function(el){removeClasses
											 (el, ["focused", "hidden", "previous", "revealed"])});
}

s.setup = function() {
  var x = document.querySelectorAll("fram");
  s.a = Array.prototype.slice.call(x);
  s.a.push(mkSentinel());
  s.a.map(function(el){ addClass(el, "hidden") });
  s.fram = 0;
  s.focus(s.fram);
}

s.setup();

var el = document;
el.onkeydown = function(evt) {
	if (s.interactive === true) {
		evt = evt || window.event;
		switch (evt.keyCode) {
		case 27: // Escape
			s.disable(); return false; break;
		case 78: // [N]ext
		case 40: // Down
			s.focusNext(); return false; break;
		case 80: // [P]revious
		case 38: // Up
			s.focusPrevious(); return false; break;
		}
	}
};

function removeClasses(el, cs){cs.map(function(c){ removeClass(el, c) })}
function removeClass(el,c){el.className = el.className.replace(c, "")}
function addClass(el, c){removeClass(el, c); el.className += (" "+c) }
function max(a,b) { if (a > b) { return(a) } else { return(b) }};
function mkSentinel() { var el= document.createElement('div'); el.innerHTML='<div></div>'; return el.firstChild }

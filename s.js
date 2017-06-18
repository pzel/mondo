window.s = {};
s.interactive = true;

s.focus = function(fram_idx, dir) {
  var focusedFram = s.a[fram_idx];
  var previousFram = (s.a[fram_idx-1] || false);
  s.a.map(function(el){removeClasses(el, ["focused", "previous"])});
  s.a.slice(0,max(0,fram_idx))
    .map(function(beforeFram){
      addClass(beforeFram, "revealed");
      removeClass(beforeFram, "hidden")});
  if (dir == "down") {addClass(previousFram, "previous")};
  s.a.slice(fram_idx, -1)
    .map(function(afterFram){addClass(afterFram, "hidden")});
  addClass(focusedFram, "focused");
  removeClasses(focusedFram, ["previous","revealed","hidden"]);
  s.keepInView(focusedFram, previousFram);
}

s.focusNext = function(){
  if (s.fram  >= s.a.length-1) {} // last el: noop 
  else {s.fram += 1; s.focus(s.fram, "down")}
}

s.focusPrevious = function(){
  if (s.fram <= 0) {}
  else {s.fram -= 1; s.focus(s.fram, "up") }
}

s.keepInView = function(fram, prevFram) {
  if (!prevFram) { return true } // first fram on page
  else {
    var rect = fram.getBoundingClientRect();
    /* To keep prev visible on top:
       var prev_rect = prevFram.getBoundingClientRect();
       window.scrollTo(0, prev_rect.top + window.pageYOffset); */
    targetTop = rect.bottom + window.pageYOffset - (window.innerHeight * .9);
    if (rect.bottom === 0) {window.scrollTo(0, window.pageYOffset) }
    else {window.scrollTo(0, targetTop)}
  }
}

s.disable = function(){
  s.interactive = false;
  s.a.map(function(el){removeClasses(
    el, ["focused", "hidden", "previous", "revealed"])});
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

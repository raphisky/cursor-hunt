

// var div = document.createElement('div');

// load cursors
var cursors = ['alias','all-scroll','auto','cell','context-menu','col-resize','copy','crosshair','e-resize','ew-resize','grab','help','move','n-resize','ne-resize','nesw-resize','ns-resize','nw-resize','nwse-resize','no-drop','not-allowed','pointer','progress','row-resize','s-resize','se-resize','sw-resize','text','vertical-text','w-resize','wait','zoom-in','zoom-out'];

// var divAmount = 10; // number of zones to create on the page

// choose a random cursor
var randomCursor;
function randomizeCursor(a) {
  var randomCursor = cursors[Math.floor(Math.random() * cursors.length)];
  return randomCursor;
};

// Load availableCursors

var cursorToAdd;
var n; // number of cursors wanted
var j;
var availableCursors = []; // where cursors generated will be stored

function filterCursors(n) {
  for (j=0; j < n ;j++) {
    cursorToAdd = randomizeCursor();
    availableCursors.push(cursorToAdd);
    console.log(availableCursors[j]);
  };
  return availableCursors;
};

// Set a cursor as the objective
var cursorToFind;
var cursorToFindDisplay = document.getElementById("objective");
var e;
function setCursorToFind(e) {
  cursorToFind = e[Math.floor(Math.random() * e.length)];
  cursorToFindDisplay.innerText = cursorToFind;
  cursorToFindDisplay.style.cursor = cursorToFind;
  console.log("cursor to find is " + cursorToFind);
  return String(cursorToFind);
};

var i;
var m;
function createDiv(m) {
  for (i = 0; i < m ; i++ ) {
    var divHeight = Math.sqrt((98*98)/ m) + 'vh';
    var divWidth = Math.sqrt((90*90)/ m) + 'vw';
    var divBorderRadius = '50%';
    var div = document.createElement('div');
    div.style.height =  divHeight;
    div.style.width = divWidth;
    div.style.borderRadius = divBorderRadius;
    div.style.cursor = availableCursors[i];
    document.getElementById("master-div").appendChild(div);
    div.setAttribute('class', 'search-zone');
  }
  console.log(i + " divs in da place");
};

var level = 10;
function newGame(level) {
  console.log("start new game " + level)
  divAmount = level * 2;
  availableCursors = filterCursors(divAmount);
  setCursorToFind(availableCursors);
  createDiv(divAmount);
}

// Initialisation.
newGame(level);


// Check if the clicked zone corresponds to the appropriate cursor.

$("body").click(function( event ) {
  var clickedCursor = event.target.style.cursor;
  var clickedDivId = event.target.id; // prevents from winning when clicking on the result box;
  console.log(clickedDivId)
  console.log("tu as cliqué " + clickedCursor + " (objectif : " + cursorToFind +" )");
  if (String(clickedCursor).valueOf() == String(cursorToFind).valueOf() && clickedDivId != "objective"  ) {
    document.getElementById('result').innerText = "thanks!";
    level += 1;
    newGame(level);
  }
  else if (String(clickedCursor).valueOf() == String(cursorToFind).valueOf() && clickedDivId == "objective") {
    document.getElementById('result').innerText = "lol nice try";
  }
  else {
    document.getElementById('result').innerText = "nope";
    console.log("cursor to find is still " + cursorToFind);
  }
});

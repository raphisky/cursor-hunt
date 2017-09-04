

// var div = document.createElement('div');

// load cursors
var cursors = ['alias','all-scroll','auto','cell','context-menu','col-resize','copy','crosshair','e-resize','ew-resize','help','move','n-resize','ne-resize','nesw-resize','ns-resize','nw-resize','nwse-resize','no-drop','not-allowed','pointer','progress','row-resize','s-resize','se-resize','sw-resize','text','vertical-text','w-resize','wait','zoom-in','zoom-out'];

// var divAmount = 10; // number of zones to create on the page

function shuffleCursors(cursorArray) {
  var ctr = cursorArray.length, temp, index;
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr --;
    temp = cursorArray[ctr];
    cursorArray[ctr] = cursorArray[index];
    cursorArray[index] = temp;
  }
  return cursorArray;
};

// initialize isotope grid
$('.grid').isotope({
  // options
  itemSelector: '.search-zone',
  layoutMode: 'masonryHorizontal',
  masonryHorizontal: {
  rowHeight: 100,
  gutter: 0
}
});


// Load availableCursors

var availableCursors = []; // where cursors generated will be stored

function filterCursors(n) {
  for (var j=0; j < n ;j++) {
    shuffleCursors(cursors);
    var cursorToAdd = cursors[j];
    availableCursors.push(cursorToAdd);
    console.log(j +" "+availableCursors[j] + " / " + availableCursors.length);
  };
  return availableCursors;
};

// Set a cursor as the objective
var cursorToFind;
var cursorToFindDisplay = document.getElementById("objective");
function setCursorToFind(e) {
  cursorToFind = e[Math.floor(Math.random() * e.length)];
  cursorToFindDisplay.innerText = cursorToFind;
  cursorToFindDisplay.style.cursor = cursorToFind;
  console.log("cursor to find is " + cursorToFind);
  return cursorToFind;
};

function createDiv(m) {
  for (var i = 0; i < m ; i++ ) {
    var divHeight = Math.sqrt((98*98)/ m) + 'vh'; // FIXME
    var divWidth = Math.sqrt((90*90)/ m) + 'vw'; // FIXME
    var divBorderRadius = '0%';
    var div = document.createElement('div');
    //div.style.height =  divHeight;
    //div.style.width = divWidth;
    div.style.borderRadius = divBorderRadius;
    div.style.cursor = availableCursors[i];
    document.getElementById("master-div").appendChild(div);
    div.setAttribute('class', 'search-zone');
  }
  console.log(i + " divs in da place");
};


function clearDivs(id) {
  var o = document.getElementById(id).childElementCount;
  var dump = document.getElementById(id).childNodes;
  var oldDivs = document.getElementById(id);
  for (var i = 0; i < o; i++) {
    oldDivs.removeChild(oldDivs.childNodes[0]);
  }
  console.log("divs have been cleared");
  $('.grid').isotope({
    // options
    itemSelector: '.search-zone',
    layoutMode: 'masonryHorizontal',
    masonryHorizontal: {
    rowHeight: 100,
    gutter: 0
  }
  });
  return true;
}

// Check if the clicked zone corresponds to the appropriate cursor.

$("body").click(function( event ) {
  var clickedCursor = event.target.style.cursor;
  var clickedDivId = event.target.id; // prevents from winning when clicking on the result box;
  console.log("tu as cliqué " + clickedCursor + " (objectif : " + cursorToFind +" )");
  if (String(clickedCursor).valueOf() == String(cursorToFind).valueOf() && clickedDivId != "objective"  ) {
    level += 1;
    scoreUp(1); // needs a delay;
    newGame(level);
  }
  else if (String(clickedCursor).valueOf() == String(cursorToFind).valueOf() && clickedDivId == "objective") {
    level += 1;
    scoreUp(1); // needs a delay;
    newGame(level);
  }
  else {
    document.getElementById('result').innerText = "nope";
    console.log("cursor to find is still " + cursorToFind);
    if (lastBarId) {
      scoreDown(lastBarId);
    }
  }
});

// Score

var lastBarId, highestScore = 0;
function scoreUp(s) {
    highestScore = highestScore + s;
    console.log("score up, score is now : "+ highestScore);
    document.getElementById('result').innerText = "thanks!";
    var bar = document.createElement('span');
    var barContent = "|";;
    bar.innerText = barContent;
    document.getElementById('progress-bars').appendChild(bar);
    bar.setAttribute('id',highestScore);
    lastBarId = bar.id;
};

function scoreDown(lastBarId) {
  var targetBar = document.getElementById(lastBarId);
  targetBar.style.opacity = 0.4;
  if (lastBarId > 0) {
    lastBarId = lastBarId - 1;
    console.log(lastBarId);
  }
  return lastBarId;
};


var level = 1;
function newGame(level) {
  availableCursors = [];
  clearDivs("master-div");
  console.log("start new game " + level);
  availableCursors = filterCursors(level);
  setCursorToFind(availableCursors);
  createDiv(level);
  return cursorToFind;
}

// Initialisation.
newGame(level);

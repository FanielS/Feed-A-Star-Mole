//TODO 
// - a button to restart the game
// - Refactor Program
// - Compare with the brian's code
// - add comments and readme File
// - revise concepts



// defines the time it takes in sad & leaving status
function getSadInterval() {
  return Date.now() + 1000;
}

//defines the time it takes in gone status
function getGoneInterval() {
  return Date.now() + Math.floor(Math.random() * 18000 + 2000);
}

//defines the time it takes in hungry status
function getHungryInterval() {
  return Date.now() + Math.floor(Math.random() * 2000) + 1000;
}

function getKingStatus() {
  return Math.random() > 0.9;
}

moles = [
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-0"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-1"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-2"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-3"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-4"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-5"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-6"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-7"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-8"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-9"),
  },
];

function getNextStatus(mole) {
  switch (mole.status) {
    case "fed":
    case "sad":
      mole.next = getSadInterval();
      mole.status = "leaving";

      if (mole.king) {
        mole.node.children[0].src = "./img/king-mole-leaving.png";
      } else {
        mole.node.children[0].src = "./img/mole-leaving.png";
      }

      break;
    case "leaving":
      mole.next = getGoneInterval();
      mole.status = "gone";
      mole.node.children[0].classList.add("gone");
      break;
    case "gone":
      mole.king = getKingStatus();
      if (mole.king) {
        mole.node.children[0].src = "./img/king-mole-hungry.png";
      } else {
        mole.node.children[0].src = "./img/mole-hungry.png";
      }

      mole.status = "hungry";
      mole.next = getHungryInterval();

      mole.node.children[0].classList.add("hungry");
      mole.node.children[0].classList.remove("gone");
      break;
    case "hungry":
      mole.status = "sad";
      mole.next = getSadInterval();

      if (mole.king) {
        mole.node.children[0].src = "./img/king-mole-sad.png";
      } else {
        mole.node.children[0].src = "./img/mole-sad.png";
      }
      mole.node.children[0].classList.remove("hungry");
      break;
  }
}

let score = 0;
function feed(e) {
  if (!e.target.classList.contains("hungry")) {
    return;
  }

  const mole = moles[parseInt(e.target.dataset.index)];

  mole.status = "fed";
  mole.next = getSadInterval();
  if (mole.king) {
    score += 2;
    mole.node.children[0].src = "./img/king-mole-fed.png";
  } else {
    score++;
    mole.node.children[0].src = "./img/mole-fed.png";
  }

  mole.node.children[0].classList.remove("hungry");

  if (score >= 10) {
    win();
  }

  document.querySelector(".worm-container").style.width = `${score * 10}%`;
}

function win() {
  document.querySelector(".container").classList.add("hide");
  document.querySelector(".win").classList.remove("hide");
}

let runAgainAt = Date.now() + 100;
function nextFrame() {
  const now = Date.now();

  if (runAgainAt <= now) {
    for (let i = 0; i < moles.length; i++) {
      if (moles[i].next <= now) {
        getNextStatus(moles[i]);
      }
    }
    runAgainAt = now + 100;
  }
  requestAnimationFrame(nextFrame);
}
nextFrame();

document.querySelector(".container").addEventListener("click", feed);

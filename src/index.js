import "./styles.css";
import rocket from "./atom.png";
import Picture from "./Picture";

const canvas = document.querySelector("canvas");
if (!canvas) console.error("Canvas not found");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = innerWidth;
const GAME_HEIGHT = innerHeight;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

let lastTime = 0;
let picture = new Picture({
  ctx,
  height: GAME_HEIGHT,
  width: GAME_WIDTH,
  url: rocket,
});

// Create game loop
function gameLoop(timestamp) {
  // Calculate delta time
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  // Clear
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  // Update
  picture.draw(0, 0);
  const image = ctx.getImageData(0, 0, picture.width, picture.height);
  picture.update(image, deltaTime);
  // Request animation frame
  setTimeout(() => requestAnimationFrame(gameLoop), 1000 / 3);
}

// Create start game function
async function startGame() {
  await picture.load();
  // Request animation frame
  requestAnimationFrame(gameLoop);
}

startGame();

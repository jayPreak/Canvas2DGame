const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
//124x68 tiles
//16x16
// console.log(floorCollisions)
const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 124) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 124));
}
const collisionBlocks = [];
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol == 8433) {
      // console.log('drawe here')
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});

const platformCollisions2D = [];
for (let i = 0; i < platformCollisions.length; i += 124) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 124));
}

const platformCollisionBlocks = [];
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol == 8433) {
      // console.log('drawe here')
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});

// console.log(collisionBlocks)

// console.log(floorCollisions2D)

canvas.width = 1260;
canvas.height = 709;
const scaledCanvas = {
  width: canvas.width / 1.5,
  height: canvas.height / 1.5,
};
const gravity = 0.5;

const player = new Player({
  position: {
    x: 500 / 1.5,
    y: 700,
  },
  collisionBlocks,
  imageSrc: "./assets/masteryi/Idle.png",
  frameRate: 10,
});
// const player2 = new Player({
//     x: 300,
//     y: 100,
// })

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/bg.png",
});

function animate() {
  window.requestAnimationFrame(animate);

  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.save();
  c.scale(1.5, 1.5);
  c.translate(0, -background.image.height + scaledCanvas.height);
  background.update();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });
  platformCollisionBlocks.forEach((block) => {
    block.update();
  });
  player.update();
  // player2.update()

  player.velocity.x = 0;
  if (keys.d.pressed) player.velocity.x = 5;
  else if (keys.a.pressed) player.velocity.x = -5;
  c.restore();

  // console.log('go')
  // console
}

animate();
window.addEventListener("keydown", (e) => {
  // console.log(e)
  switch (e.key) {
    case "d":
      keys.d.pressed = true;
      // console.log("Right key is pressed.");
      break;
    case "ArrowRight":
      keys.d.pressed = true;
      // console.log("Right key is pressed.");
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "ArrowLeft":
      keys.a.pressed = true;
      break;
    case "w":
      player.velocity.y = -9;
      break;
    case "ArrowUp":
      player.velocity.y = -9;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  // console.log(e)
  switch (e.key) {
    case "d":
      keys.d.pressed = false;
      // console.log("Right key is pressed.");
      break;
    case "ArrowRight":
      keys.d.pressed = false;
      // console.log("Right key is pressed.");
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "ArrowLeft":
      keys.a.pressed = false;
      break;
  }
});

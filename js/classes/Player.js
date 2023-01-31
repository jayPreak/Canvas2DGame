class Player extends Sprite {
  constructor({
    position,
    collisionBlocks,
    imageSrc,
    frameRate,
    scale = 1.7,
    animations,
  }) {
    super({ imageSrc, frameRate, scale });
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };

    this.width = 100 / 1.5;
    this.height = 100 / 1.5;
    this.collisionBlocks = collisionBlocks;
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    };
    this.animations = animations;

    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;

      this.animations[key].image = image;
    }
  }

  // draw() {
  //     c.fillStyle = 'red'
  //     c.fillRect(this.position.x, this.position.y, this.width, this.height)
  // }

  switchSprite(key) {
    if (this.image === this.animations[key] || !this.loaded) return;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
  }

  update() {
    this.updateFrames();
    this.updateHitbox();
    c.fillStyle = "rgba(0, 255, 0, 0.2)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    c.fillStyle = "rgba(255, 0, 0, 0.2)";
    c.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    );
    this.draw();
    // this.position.y += this.velocity.y
    this.position.x += this.velocity.x;
    // if (this.position.y + this.height + this.velocity.y < canvas.height){
    // this.velocity.y += gravity
    // } else {
    //     this.velocity.y=0
    // }
    this.updateHitbox();
    this.checkForHorizontalCollisions();
    this.applyGravity();
    this.updateHitbox();
    this.checkForVerticalCollisions();
  }
  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 78,
        y: this.position.y + 69,
      },
      width: 65,
      height: 70,
    };
  }
  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        // this.position.y + this.height >= collisionBlock.position.y &&
        // this.position.y <= collisionBlock.position.y + collisionBlock.height &&
        // this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        // this.position.x + this.width >= collisionBlock.position.x
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        // console.log("we r colliding")
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;

          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += gravity;
    this.position.y += this.velocity.y;
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        // this.position.y + this.height >= collisionBlock.position.y &&
        // this.position.y <= collisionBlock.position.y + collisionBlock.height &&
        // this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        // this.position.x + this.width >= collisionBlock.position.x
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        // console.log("we r colliding")
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
      }
    }
  }
}

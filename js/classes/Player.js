class Player extends Sprite {
  constructor({ position, collisionBlocks, imageSrc, frameRate, scale = 1.2 }) {
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
  }

  // draw() {
  //     c.fillStyle = 'red'
  //     c.fillRect(this.position.x, this.position.y, this.width, this.height)
  // }

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
    this.checkForHorizontalCollisions();
    this.applyGravity();
    this.checkForVerticalCollisions();
  }
  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 55,
        y: this.position.y + 48,
      },
      width: 53.5,
      height: 51.5,
    };
  }
  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height &&
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x
        // collision({
        //     this: this,
        //     collisionBlock: collisionBlock,
        // })
      ) {
        // console.log("we r colliding")
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          this.position.x = collisionBlock.position.x - this.width - 0.01;
          break;
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + 0.01;
          break;
        }
      }
    }
  }

  applyGravity() {
    this.position.y += this.velocity.y;
    this.velocity.y += gravity;
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height &&
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x
        // collision({
        //     this: this,
        //     collisionBlock: collisionBlock,
        // })
      ) {
        // console.log("we r colliding")
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.position.y = collisionBlock.position.y - this.height - 0.01;
          break;
        }
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + 0.01;
          break;
        }
      }
    }
  }
}

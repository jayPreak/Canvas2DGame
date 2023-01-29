class Player extends Sprite {
    constructor({position, collisionBlocks, imageSrc}) {
        super({ imageSrc })
        this.position = position
        this.velocity = {
            x:0,
            y:1,
        }
        
        // this.width = 100/1.5
        // this.height = 100/1.5
        this.collisionBlocks = collisionBlocks
    }

    // draw() {
    //     c.fillStyle = 'red'
    //     c.fillRect(this.position.x, this.position.y, this.width, this.height)
    // }

    update() {
        this.draw()
        // this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        // if (this.position.y + this.height + this.velocity.y < canvas.height){
            // this.velocity.y += gravity
        // } else {
        //     this.velocity.y=0
        // }
        this.checkForHorizontalCollisions()
        this.applyGravity()
        this.checkForVerticalCollisions()
    }
    checkForHorizontalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

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
                    this.velocity.x = 0
                    this.position.x = collisionBlock.position.x - this.width -0.01
                    break
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
                    break
                }
            }

        }
    }
    
    applyGravity() {
        this.position.y += this.velocity.y
        this.velocity.y += gravity
    }

    checkForVerticalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

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
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y - this.height -0.01
                    break
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
                    break
                }
            }

        }
    }
}
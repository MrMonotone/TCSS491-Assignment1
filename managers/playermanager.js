var gm = gm || {};

function Player(spec) {
	// Animation: spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
	this.downAnimation = new Animation({spriteSheet: spec.spriteSheet, startX: 0, startY: 10 * 64, 
										frameWidth: 64, frameHeight: 64, frameDuration: 0.1, 
										frames: 9, loop: true, reverse: false});
	this.upAnimation = new Animation({spriteSheet: spec.spriteSheet, startX: 0, startY: 8 * 64, 
										frameWidth: 64, frameHeight: 64, frameDuration: 0.1, 
										frames: 9, loop: true, reverse: false});
	this.leftAnimation = new Animation({spriteSheet: spec.spriteSheet, startX: 0, startY: 9 * 64, 
									frameWidth: 64, frameHeight: 64, frameDuration: 0.1, 
									frames: 9, loop: true, reverse: false});
	this.rightAnimation = new Animation({spriteSheet: spec.spriteSheet, startX: 0, startY: 11 * 64, 
								frameWidth: 64, frameHeight: 64, frameDuration: 0.1, 
								frames: 9, loop: true, reverse: false});
	
	this.attackLeftAnimation = new Animation({spriteSheet: spec.spriteSheet, startX: 0, startY: 25 * 64, 
								frameWidth: 64 * 3, frameHeight: 64 * 3, frameDuration: 0.1, 
								frames: 6, loop: true, reverse: false});
								
	this.attackRightAnimation = new Animation({spriteSheet: spec.spriteSheet, startX: 0, startY: 29 * 64 + 32, 
							frameWidth: 64 * 3, frameHeight: 64 * 3, frameDuration: 0.1, 
							frames: 6, loop: true, reverse: false});
	
	this.animation = this.downAnimation;
	
	// When changing the hitbox, also change x and y shift in draw collision box
	Entity.call(this, spec.x, spec.y);
}

Player.prototype.controls = function () {
	//starting controls
	gm.im.addInput(new Input("up", 'w'));
    gm.im.addInput(new Input("down", 's'));
    gm.im.addInput(new Input("left", 'a'));
    gm.im.addInput(new Input("right", 'd'));
	gm.im.addInput(new Input("attack", 'm'));
}

Player.prototype.draw = function (ctx) 
{
	if (this.animation === this.attackLeftAnimation)
	{
		this.animation.drawFrame(gm.clockTick, ctx, this.x - 48, this.y, 1);
	}
	else if (this.animation === this.attackRightAnimation)
	{
		// tick, ctx, x, y, scaleBy
		this.animation.drawFrame(gm.clockTick, ctx, this.x - 64, this.y - 64 - 32, 1);
	}
	else
	{
		// tick, ctx, x, y, scaleBy
		this.animation.drawFrame(gm.clockTick, ctx, this.x, this.y, 1);
	}
}

Player.prototype.update = function () 
{
		if(gm.im.checkInput("up"))
		{
			this.animation = this.upAnimation;
			this.y -= 3;
		}
		else if(gm.im.checkInput("down"))
		{
			this.animation = this.downAnimation;
			this.y += 3;
		}
		else if(gm.im.checkInput("left"))
		{
			if (gm.im.checkInput("attack"))
			{
				this.animation = this.attackLeftAnimation;
			}
			else
			{
				this.animation = this.leftAnimation;
				this.x -= 3;
			}
		}
		else if(gm.im.checkInput("right"))
		{
			if (gm.im.checkInput("attack"))
			{
				this.animation = this.attackRightAnimation;
			}
			else
			{
				this.animation = this.rightAnimation;
				this.x += 3;
			}
		}
		else
		{
			this.animation = this.downAnimation;
		}
}
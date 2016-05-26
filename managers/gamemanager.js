function GameManager(ctx)
{
    this.ctx = ctx;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
	this.clockTick = 0;
	this.im = null; // InputManager
    this.am = null; // AssetManager
    this.em = null; // EntityManager
	
    this.timer = null;   
}

/* loads the starting map and character's starting position. */
GameManager.prototype.initialize = function ()
{
	this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
	this.timer = new Timer();
    let p = new Player({x: 100, y: 100, spriteSheet: this.am.getAsset("./img/player.png")});
    this.em.addEntity(p)
    p.controls();
    this.startInput();
    console.log('game initialized');
}

GameManager.prototype.initManagers = function (params) {
        console.log("here")
	this.am = new AssetManager();
    this.em = new EntityManager();
    this.im = new InputManager("Dungeon");
	
	console.log("Managers Initialized");
}

GameManager.prototype.start = function()
{
	this.initManagers();
	this.queueAssets();
    console.log("here")
    this.am.downloadAll(() => {
		// this.startBattle(new Fire(gm, 64, 256));
	 	this.initialize();
        this.loop();
    })
}

GameManager.prototype.queueAssets = function () {
	this.am.queueDownload("./img/player.png");
}

GameManager.prototype.startInput = function () {
    console.log('Starting input');
    this.im.start();
    console.log('Input started');
}

GameManager.prototype.loop = function () {
    this.clockTick = this.timer.tick();
	this.em.update();
	this.em.draw();
    requestAnimationFrame(this.loop.bind(this), this.ctx.canvas);
}

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}
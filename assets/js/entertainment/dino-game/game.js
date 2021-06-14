var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'canvas',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('background', '/assets/img/dino-game/bg.png');
    this.load.image('can', '/assets/img/dino-game/can.png');
    this.load.image('bleach', '/assets/img/dino-game/bleach.png');
    this.load.image('spoon', '/assets/img/dino-game/spoon.png');
    this.load.image('fork', '/assets/img/dino-game/fork.png');
    this.load.spritesheet('fish',
        '/assets/img/dino-game/fish.png',
        { frameWidth: 2271, frameHeight: 1813 }
    );
}

let player;
let debrisGroup;
let background;
let startTime;
let gameState = "beforeStart";
let debrisCollider;

const debrisOptions = ['can', 'bleach', 'spoon', 'fork'];

function create() {
    background = this.add.image(game.config.width/2, game.config.height/2, 'background');;
    background.displayWidth = this.sys.canvas.width;
    background.displayHeight = this.sys.canvas.height;
    background.setTint(0x00000055)

    player = this.physics.add.sprite(100, game.config.height/2, 'fish');
    player.setScale(0.05);
    player.setCollideWorldBounds(true);
    player.setDrag(120);

    debrisGroup = this.physics.add.group({
        defaultKey: 'can',
        maxSize: 300,
        createCallback: function (debris) {
            debris.setName('debris' + this.getLength());
        },
        removeCallback: function (debris) {
        }
    });

    this.time.addEvent({
        delay: 500,
        loop: true,
        callback: addDebris
    });

    startTime = game.getTime();

    startGame = startGame.bind(this);
}

function startGame() {
    debrisCollider = this.physics.add.collider(player, debrisGroup, hitDebris, null, this);
    player.setCollideWorldBounds(true);
    
    startTime = game.getTime();
    background.clearTint();
    gameState = "ongoing";
}

function addDebris() {
    if (gameState != "ongoing") return;
    let time = game.getTime() - startTime;
    if (Math.random()*15000 > time) return;
    const y = Phaser.Math.Between(0, game.config.height);
    const debris = debrisGroup.get(game.config.width, y, debrisOptions[Math.floor(Math.random() * debrisOptions.length)]);
    if (!debris) return;
    debris.setActive(true).setVisible(true).setScale(0.3);
}

function hitDebris(player, bomb) {
    if (gameState != "ongoing") return;
    debrisCollider.destroy();
    player.setTint(0xff0000);

    player.setVelocityX(-200);
    player.setVelocityY(-90);
    player.setAngularVelocity(-200);
    console.log("true!");
    player.setCollideWorldBounds(false);

    gameState = "rewinding";
    startTime = game.getTime();
}

function update() {
    let time = game.getTime() - startTime;

    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.up.isDown || cursors.space.isDown || this.input.activePointer.isDown) {
        if (gameState == "ongoing") player.setVelocityY(-160);
        else if (gameState == "beforeStart") startGame(this);
    } else if (gameState != "ongoing") null;
    else if (cursors.down.isDown) {
        player.setVelocityY(+160);
    } else {
        player.y += 0.5;
    }

    debrisGroup.children.iterate(function (debris) {
        if (debris.x > 800) {
            debrisGroup.killAndHide(debris);
        }
    });

    if (gameState == "ongoing") {
        Phaser.Actions.IncX(debrisGroup.getChildren(), -2);
        Phaser.Actions.Rotate(debrisGroup.getChildren(), 0.1);
    } else if (gameState == "rewinding") {
        Phaser.Actions.IncX(debrisGroup.getChildren(), 2/9e6*Math.pow(time, 2)-2);
        Phaser.Actions.Rotate(debrisGroup.getChildren(), -1/9e7*Math.pow(time, 2)+0.1);

        if (debrisGroup.countActive() == 0) {
            player.clearTint();
            player.setAngularVelocity(0);
            // this.physics.moveTo(player, 100, game.config.height/2);
            this.tweens.add({
                targets: player,
                x: 100,
                y: game.config.height/2,
                angle: 0,
                ease: 'Power1',
                duration: 3000,
                onComplete: (tween, targets) => {
                    background.setTint(0x00000055)
                    gameState = "beforeStart";
                },
            });
        }
    }
}

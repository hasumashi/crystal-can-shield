'use strict';

import './style.css';
import Phaser from 'phaser'

const world = {
	player: {
		speed: 250,
		object: null,
		setSpeedX: (speed) => world.player.object.setVelocityX(speed),
		setSpeedY: (speed) => world.player.object.setVelocityY(speed),

		fire: (angle) => {
			console.log(angle);
		}
	},
	gunAngle: 0,
	bullets: null,
	gun: {
		sprite: null,
	}
}


function preload() {
	this.load.setBaseURL('http://labs.phaser.io')
	// this.load.image('player', 'assets/sprites/asuna_by_vali233.png')
	this.load.image('player', 'assets/sprites/master.png');
	this.load.image('enemy', 'assets/sprites/phaser-dude.png');
    this.load.image('bullet', 'assets/sprites/purple_ball.png');

	this.load.image('sky', 'assets/skies/space3.png')
	// this.load.image('red', 'assets/particles/red.png')
}

function create() {
	/* add player */
	world.player.object = this.physics.add.group();
	world.player.object = this.physics.add.sprite(470, 360, 'player');
	world.player.object.setBounce(0.2);
	world.player.object.setCollideWorldBounds(true);

	/* bullets */
	world.bullets = this.physics.add.group();

	/* mouse input */
    this.input.on('pointermove', function (pointer) {
		world.gunAngle = Phaser.Math.Angle.BetweenPoints(world.player.object, pointer);
    }, this);

    this.input.on('pointerup', function () {
		const bullet = world.bullets.create(world.player.object.x, world.player.object.y, 'bullet');
		this.physics.velocityFromRotation(world.gunAngle, 600, bullet.body.velocity);
    }, this);
}

function update() {
	/* keyboard input */
	// const cursors = this.input.keyboard.createCursorKeys();
	const cursors = this.input.keyboard.addKeys({
		up: Phaser.Input.Keyboard.KeyCodes.W,
		down: Phaser.Input.Keyboard.KeyCodes.S,
		left: Phaser.Input.Keyboard.KeyCodes.A,
		right: Phaser.Input.Keyboard.KeyCodes.D
	});

	if (cursors.left.isDown) {
		world.player.setSpeedX(-world.player.speed);
		// world.player.object.anims.play('left', true);
	} else if (cursors.right.isDown) {
		world.player.setSpeedX(world.player.speed);
		// world.player.object.anims.play('right', true);
	} else {
		world.player.setSpeedX(0);
	}

	if (cursors.up.isDown) {
		world.player.setSpeedY(-world.player.speed);
		// world.player.object.anims.play('left', true);
	} else if (cursors.down.isDown) {
		world.player.setSpeedY(world.player.speed);
		// world.player.object.anims.play('right', true);
	} else {
		world.player.setSpeedY(0);
	}
}

function render() {

}

const config = {
	type: Phaser.AUTO,
	width: 1000,
	height: 800,
	physics: {
		default: 'arcade',
		// arcade: {
		// 	gravity: { y: 200 },
		// },
	},
	scene: {
		preload,
		create,
		update,
		// render,
	},
}

const game = new Phaser.Game(config)

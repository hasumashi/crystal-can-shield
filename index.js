'use strict';

import './style.css';
import Phaser from 'phaser'

const world = {
	player: {
		speed: 250,
		sprite: null,
		setSpeedX: (speed) => world.player.sprite.setVelocityX(speed),
		setSpeedY: (speed) => world.player.sprite.setVelocityY(speed),
	},
}

function preload() {
	this.load.setBaseURL('http://labs.phaser.io')
	// this.load.image('player', 'assets/sprites/asuna_by_vali233.png')
	this.load.image('player', 'assets/sprites/master.png')
	this.load.image('enemy', 'assets/sprites/phaser-dude.png')

	this.load.image('sky', 'assets/skies/space3.png')
	// this.load.image('red', 'assets/particles/red.png')
}

function create() {
	// this.add.image(400, 300, 'sky')

	// const logo = this.physics.add.image(400, 100, 'logo')
	// logo.setVelocity(100, 200)
	// logo.setBounce(1, 1)
	// logo.setCollideWorldBounds(true)

	/* add player */
	world.player.sprite = this.physics.add.sprite(57, 77, 'player');
	world.player.sprite.setBounce(0.2);
	world.player.sprite.setCollideWorldBounds(true);
	
	/* add enemy */
	const enemy = this.physics.add.image(27, 40)
}

function update() {
	/* keyboard input */
	const cursors = this.input.keyboard.createCursorKeys();

	if (cursors.left.isDown) {
		world.player.setSpeedX(-world.player.speed);
		// world.player.sprite.anims.play('left', true);
	} else if (cursors.right.isDown) {
		world.player.setSpeedX(world.player.speed);
		// world.player.sprite.anims.play('right', true);
	} else {
		world.player.setSpeedX(0);
	}

	if (cursors.up.isDown) {
		world.player.setSpeedY(-world.player.speed);
		// world.player.sprite.anims.play('left', true);
	} else if (cursors.down.isDown) {
		world.player.setSpeedY(world.player.speed);
		// world.player.sprite.anims.play('right', true);
	} else {
		world.player.setSpeedY(0);
	}

	// if (cursors.up.isDown && world.player.sprite.body.touching.down) {
	// 	world.player.sprite.setVelocityY(-330);
	// }
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
	},
}

const game = new Phaser.Game(config)

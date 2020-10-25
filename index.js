'use strict';

import './style.css';
import Phaser from 'phaser'

import { Gun } from './guns/Gun';

const world = {
	player: {
		speed: 250,
		object: null,
		setSpeedX(speed) { world.player.object.setVelocityX(speed) },
		setSpeedY(speed) { world.player.object.setVelocityY(speed) },

		gunAngle: 0,
		primaryGun: null,
		secondaryGun: null,
		shoot() { this.primaryGun.shoot(world.player.gunAngle) },
		swapGuns() {
			const temp = this.primaryGun;
			this.primaryGun = this.secondaryGun;
			this.secondaryGun = temp;
		}
	},
	bullets: null,

	guns: {},
	createGun(name, params, scene) {
		const gun = new Gun(name, params);
		this.guns[name] = gun;
		gun.preloadAssets(scene, this.player.object);
	},
}


function preload() {
	/* sprites */
	this.load.setBaseURL('http://labs.phaser.io')
	// this.load.image('player', 'assets/sprites/asuna_by_vali233.png')
	this.load.image('player', 'assets/sprites/master.png');
	this.load.image('enemy', 'assets/sprites/phaser-dude.png');

	/* guns */
	world.createGun('Pistol', {
		damage: 1,
		fireRate: 0.2,
		bulletSpeed: 100,
		gunSprite: 'assets/sprites/player_handgun.png',
		bulletSprite: 'assets/sprites/yellow_ball.png',
	}, this);

	world.createGun('Orb pistol', {
		damage: 2,
		fireRate: 0.5,
		bulletSpeed: 60,
		bulletBounce: true,
		gunSprite: 'assets/sprites/player_handgun.png',
		bulletSprite: 'assets/sprites/orb-red.png',
	}, this);

	world.player.primaryGun = world.guns['Pistol'];
	world.player.secondaryGun = world.guns['Orb pistol'];
}

function create() {
	/* add player */
	world.player.object = this.physics.add.group();
	world.player.object = this.physics.add.sprite(470, 360, 'player');
	world.player.object.setBounce(0.2);
	world.player.object.setCollideWorldBounds(true);

	console.log(this);
	for (const gun of Object.values(world.guns)) {
		console.log(this);
		gun.init(this, world.player.object);
	}

	/* bullets */
	world.bullets = this.physics.add.group();

	/* mouse input */
    this.input.on('pointermove', function (pointer) {
		world.player.gunAngle = Phaser.Math.Angle.BetweenPoints(world.player.object, pointer);
    }, this);

    this.input.on('pointerup', function () {
		// const bullet = world.bullets.create(world.player.object.x, world.player.object.y, 'bullet');
		// this.physics.velocityFromRotation(world.player.gunAngle, 600, bullet.body.velocity);
		world.player.shoot();
    }, this);
}

function update() {
	/* keyboard input */
	// const cursors = this.input.keyboard.createCursorKeys();
	const cursors = this.input.keyboard.addKeys({
		up: Phaser.Input.Keyboard.KeyCodes.W,
		down: Phaser.Input.Keyboard.KeyCodes.S,
		left: Phaser.Input.Keyboard.KeyCodes.A,
		right: Phaser.Input.Keyboard.KeyCodes.D,

		swap: Phaser.Input.Keyboard.KeyCodes.SPACE,
		use: Phaser.Input.Keyboard.KeyCodes.E,
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

	if (this.input.keyboard.checkDown(cursors.swap, 200)) {
		world.player.swapGuns();
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

'use strict';

export class Gun {
	_defaultParams = {
		bulletSpeed: 100,
		fireRate: 0.2, // sec
		gunSprite: 'assets/sprites/player_handgun.png',
		bulletSprite: 'assets/sprites/purple_ball.png',
		// future:
		bulletBounce: false,
		damage: 1,
	};

	_scene = null;
	_player = null;
	_bullets = null;

	constructor(name, params) {
		this.name = name;
		this.params = Object.assign({}, this._defaultParams, params);
	}

	preloadAssets(scene) {
		this._bulletSpriteName = `${this.name}__gun`;
		this._gunSpriteName = `${this.name}__bullet`;
		scene.load.image(this._gunSpriteName, this.params.gunSprite);
		scene.load.image(this._bulletSpriteName, this.params.bulletSprite);
	}

	init(scene, player) {
		this._scene = scene;
		this._player = player;
		this._bullets = scene.physics.add.group();
		console.log(`init ${this.name}`, this._player, this._bullets);
	}

	shoot(angle) {
		const bullet = this._bullets.create(this._player.x, this._player.y, this._bulletSpriteName);
		this._scene.physics.velocityFromRotation(angle, 600, bullet.body.velocity);
	}
}

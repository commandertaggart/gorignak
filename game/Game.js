
import GameStream from 'gamestream';
import { Arena, Entity } from '../ecs/';
import PhysicsSystem from './physics/PhysicsSystem.js';

export default class Game extends Arena {
	
	constructor() {
		super();
		console.info('Congratulations minor mortal!!! You are playing..... Gooooorignaaaaaaaaakkkkk!!!!');

		this.stream = new GameStream();

		this._systems = [];

		var physicsSystem = new PhysicsSystem();
		this.addSystem(physicsSystem);
	}

	addSystem(system) {
		this._systems.push(system);
	}

	tick(delta) {
		this._systems.forEach(system => system.tick(delta));
	}

}

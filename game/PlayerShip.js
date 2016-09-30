
import { Entity } from '../ecs';

export default class PlayerShip extends Entity
{
	constructor()
	{
		super('player-ship', { x:0, y:0, z:0 });

		// create components
	}
}
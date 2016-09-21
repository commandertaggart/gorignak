
import Game from '../game/Game.js';
import { SocketServer } from 'gamestream';

function now() {
	return +(new Date());
}

export default class GameServer {
	
	constructor() {
		this.game = new Game();
		this.socketServer = new SocketServer();
		this.game.stream.pipe(this.socketServer);

		const tick = this.tick.bind(this);
		setInterval(tick, 50);
	}

	tick() {
		const delta = this._tickDelta();

		this._count = (this._count || 0) + delta;
		this.game.stream.updateNow({
			count: this._count
		});

		this.game.tick(delta);
	}

	_tickDelta() {
		const time = now();
		if (this._lastTick === undefined) {
			this._lastTick = time;
		}
		const delta = time - this._lastTick;
		this._lastTick = time;
		return delta;
	}

}

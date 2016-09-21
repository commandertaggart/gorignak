
import Game from '../game/Game.js';
import { SocketServer } from 'gamestream';

export default class GameServer {
	
	constructor() {
		this.game = new Game();
		this.socketServer = new SocketServer();
		this.game.stream.pipe(this.socketServer);

		var count = 0;
		setInterval(() => {
			count++;
			this.game.stream.updateNow({
				count: count
			});
		}, 1000);
	}

}

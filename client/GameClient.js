
import Game from '../game/Game.js';
import { Socket } from 'gamestream';

export default class GameClient {

	constructor() {
		this.game = new Game();
		this.game.stream.on('data', (data) => { console.info(data); });
		this.socket = new Socket();
		this.socket.pipe(this.game.stream);
	}

}

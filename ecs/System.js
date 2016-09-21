
export default class System {
	
	constructor(id, type) {
		this._id = id;
		this._type = type;
		this.systems = {};
	}

	tick(delta) {
		this.eachSystem((system) => system.tick(delta));
		this._tick();
	}

	eachSystem(callback) {
		Object.keys(this.systems).forEach((id) => callback(this.systems[id]));
	}

	// override me
	_tick() {}

}

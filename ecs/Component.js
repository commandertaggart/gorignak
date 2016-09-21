

export default class Component
{
	// type is provided by subclass constructor
	constructor(id, type)
	{
		this._id = id;
		this._type = type || "undefined";

		this._parent = null;
	}

	get parent() { return this._parent; }
	set parent(parent) { this._parent = parent; }

	get type() { return this._type; }
}

var __frame = 0;

export default class Component
{
	// type is provided by subclass constructor
	constructor(id, type)
	{
		this._id = id;
		this._type = type || "undefined";

		this._parent = null;

		this._valid = false;
		this._dependencies = [];
		this._lastTickFrame = -1;
	}

	dependentOn(componentType)
	{
		this._dependencies.push(componentType);
	}

	validate()
	{
		if (this._valid) return;

		if (!this._parent)
		{
			throw new Error("Component " + this._id + " (" + this._type + ") does not have a parent Entity.");
		}

		var list = [];
		this._dependencies.forEach(type => {
			let set = this._parent.componentsOfType(type);
			if (set.length == 0)
			{
				throw new Error("Component " + this._id + " (" + this._type + 
					") requires a sibling component of type " + type);
			}
			list = list.concat(set);
		});
		this._dependencies = list;
	}

	get parent() { return this._parent; }
	set parent(parent) { this._parent = parent; }

	get type() { return this._type; }

	shouldDeferTick()
	{
		return this._dependencies.every(dep => dep._lastTickFrame > this._lastTickFrame);
	}

	tick(delta)
	{
		if (this._lastTickFrame < 0)
			{ this.validate(); }
		this._lastTickFrame = __frame;

		this._tick(delta);
	}

	_tick(delta)
	{
		// override this
	}
}

Component.nextFrame = nextFrame()
{
	++__frame;
}

let EventEmitter = require('events');
import Component from './Component.js';

export default class Entity
{
	constructor(id, position) {
		this._id = id;
		this._position = position || {};
		this._position = {
			x: this.position.x || 0, 
			y: this.position.y || 0, 
			z: this.position.z || 0
		};

		this._components = [];
		this._valid = false;
		this._events = new EventEmitter();
	}

	on(event, handler)
	{ this._events.on(event, handler); }
	once(event, handler)
	{ this._events.once(event, handler); }
	off(event, handler)
	{ this._events.removeListener(event, handler); }
	emit(event, ...args)
	{
		args.unshift(event, this);
		this._events.emit.apply(this._events, args);
	}

	get id() { return _id; }
	get position() { return _position; }
	get components() { return _components; }

	addComponent(component)
	{
		if (!component instanceof Component)
			{ return false; }

		if (component in this._components)
			{ return false; }

		this._components.push(component);
		component.parent = this;
	}

	removeComponentAtIndex(index)
	{
		if (index >= 0 && index < this._components.length)
		{
			var component = this._components[idx];
			this._components.splice(idx, 1);

			component.parent = null;

			return true;
		}
		return false;
	}

	removeComponent(component)
	{
		var idx;

		// can be a component object
		idx = this._components.indexOf(idx);
		if (idx >= 0)
		{ return this.removeComponentAtIndex(idx); }

		// otherwise check for id match
		idx = this._components.findIndex(item => item.id == component);
		if (idx >= 0)
		{ return this.removeComponentAtIndex(idx); }

		// or type match
		var typeMatch = false;
		while ((idx = this._components.findIndex(item => item.type == component)) >= 0)
		{ typeMatch = typeMatch || this.removeComponentAtIndex(idx); }

		return typeMatch;
	}

	componentsOfType(type)
	{
		return this._components.filter(item => item.type == type);
	}

	isA(componentType)
	{
		return this._components.some(item => item.type === componentType);
	}

	isAnyOf(...componentTypes)
	{
		return componentTypes.some(type => this.isA(type));
	}

	isAllOf(...componentTypes)
	{
		return componentTypes.every(type => this.isA(type));
	}

	validate()
	{
		this._components.forEach(component => component.validate());

		var unsorted = this._components;
		var sorted = [];

		while (unsorted.length > 0)
		{
			let count = unsorted.length;

			unsorted = unsorted.filter(c => {
				if (c.every(d => sorted.indexOf(d) >= 0))
				{
					sorted.push(c);
					return false;
				}
				return true;
			});

			if (count == unsorted.length)
			{
				console.error("Entity '" + this._id + "' has circularly dependent components: " +
					unsorted.map(c => "'" + c.id + "'").join(", "));
				sorted = sorted.concat(unsorted);
				unsorted = [];
			}
		}

		this._components = sorted;
		this._valid = true;
	}

	tick()
	{
		if (!this._valid)
			{ this.validate(); }

		var components = this._components.slice();

		while (components.length > 0)
		{
			let len = components.length;
			components = components.filter(c => {
				if (c.shouldDeferTick())
					{ return true; }
				c.tick();
				return false;
			});

			if (len == components.length)
			{
				// all of them want to defer, looks like a circular dependency.
				components = components.filter(c => {
					c.tick();
					return false;
				});
			}
		}
	}
}
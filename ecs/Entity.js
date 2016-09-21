
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
}
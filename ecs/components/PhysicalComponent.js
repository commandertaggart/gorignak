
import Component from '../Component';

export default class PhysicalComponent extends Component
{
	constructor (id)
	{
		super(id, "PhysicalComponent");

		this._position = { x:0, y:0, z:0 };
		this._rotation = { x:0, y:0, z:0, w:0 };
		this._velocity = { x:0, y:0, z:0 };
		this._angularVelocity = { x:0, y:0, z:0 };
	}

	get position() { return this._position; }
	get rotation() { return this._rotation; }
	get velocity() { return this._velocity; }
	get angularVelocity() { return this._angularVelocity; }
}
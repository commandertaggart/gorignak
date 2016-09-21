
import EntityCollection from 'EntityCollection';

export default class Arena
{
	constructor ()
	{
		this._entities = new EntityCollection;
	}

	addEntity(entity)
	{
		this._entities.add(entity);
		entity.on('die', this.removeEntity);
	}

	removeEntity(entity)
	{
		entity.off('die', this.removeEntity);
		this._entities.remove(entity)
	}

	entities()
	{
		return this._entities.clone();
	}

	entitiesWithComponent(component)
	{
		return this._entities.filterByComponentType(component);
	}

}
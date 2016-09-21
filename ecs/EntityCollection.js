
export default class EntityCollection
{
	constructor(array = [])
	{
		if (array instanceof EntityCollection)
			{ array  = array._.slice(); }

		this._ = array;
	}

	add(entity)
	{
		var idx = this._.indexOf(entity);
		if (idx < 0)
			{ this._.push(entity); }
	}

	remove(entity)
	{
		var idx = this._.indexOf(entity);
		if (idx >= 0)
			{ this._.splice(idx, 1); }
	}

	forEach(fn)
	{ this._.forEach(entity => fn(entity)); }
	
	clone()
	{
		return new EntityCollection(this._.slice());
	}

	filter(condition)
	{
		return new EntityCollection(this._.filter(condition));
	}

	filterByComponentType(type)
	{
		return this.filter(entity => entity.type == type);
	}
}
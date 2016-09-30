
import Component from '../Component';

export default class UserInputComponent extends Component
{
	constructor (id)
	{
		super(id, 'UserInputComponent');
		this._activeCommands = {};
	}

	commandStart(command)
	{
		var time =  +new Date;
		command = this._activeCommands[command] || { last_stop: 0 };
		command.active = true;
		command.last_start = time;
	}

	commandStop(command)
	{
		var time =  +new Date;
		command = this._activeCommands[command] || { last_start: 0 };
		command.active = false;
		command.last_stop = time;
	}

	commandIsActive(command)
	{
		command = this._activeCommands[command] || { last_start: 0, last_stop: 0 };

		return command.last_start > command.last_stop;
	}

	commandWasActivatedSince(command, time, andIsActiveNow = false)
	{
		command = this._activeCommands[command] || { last_start: 0, last_stop: 0 };

		if (command.last_start >= time)
		{
			if (command.last_stop < command.last_start || !andIsActiveNow)
			{
				return true;
			}
		}
		return false;
	}
}

UserInputComponent.Commands = Commands;
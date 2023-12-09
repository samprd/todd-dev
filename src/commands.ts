import pingCommand from "./commands/ping.js";
import beaverCommand from "./commands/beaver.js";

// sets all commands
const commands = [
	pingCommand,
	beaverCommand,
];

const guildCommands: any = [];

const commandsList = [commands, guildCommands];

export default commandsList;

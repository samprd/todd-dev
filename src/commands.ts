import pingCommand from './commands/ping.js';
import beaverCommand from './commands/beaver.js';
import tagCommand from './commands/tag.js';
import rulesCommand from './guildcommands/rules.js';
// import mdnDocsCommand from "./commands/mdn.js";

// sets all commands
const commands = [
	pingCommand,
	beaverCommand,
	tagCommand,
//	mdnDocsCommand,
];

const guildCommands = [
	rulesCommand,
];

const commandsList = [commands, guildCommands];

export default commandsList;

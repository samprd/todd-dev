import helloCommand from "./commands/hello.js";

// sets all commands
const commands: any = [helloCommand];

const guildCommands: any = [];

const commandsList = [commands, guildCommands];

export default commandsList;

import { SlashCommandBuilder } from '@discordjs/builders';

const pingCommand = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Pong!')
	.setDMPermission(false);

export default pingCommand.toJSON();

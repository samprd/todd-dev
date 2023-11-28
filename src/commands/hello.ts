import { SlashCommandBuilder } from '@discordjs/builders';

const helloCommand = new SlashCommandBuilder()
	.setName('hello')
	.setDescription('Say hello!')
	.setDMPermission(false);

export default helloCommand.toJSON();

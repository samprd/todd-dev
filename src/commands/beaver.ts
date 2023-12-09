import { SlashCommandBuilder } from '@discordjs/builders';

const beaverCommand = new SlashCommandBuilder()
	.setName('beaver')
	.setDescription('Fetch an image of a lovely beaver!')
	.setDMPermission(false);

export default beaverCommand.toJSON();

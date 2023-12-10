import { SlashCommandBuilder } from '@discordjs/builders';

const mdnDocsCommand = new SlashCommandBuilder()
	.setName('mdndocs')
	.setDescription('Searches the MDN Docs!')
	.setDMPermission(false)
	.addStringOption((option) => option
		.setName("query")
		.setDescription("search query")
		.setRequired(true)
	);

export default mdnDocsCommand.toJSON();

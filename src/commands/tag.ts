import { SlashCommandBuilder } from '@discordjs/builders';

const tagCommand = new SlashCommandBuilder()
	.setName('tag')
	.setDescription('Tags')
	.setDMPermission(false)
	.addStringOption((option) => option
		.setName('tag')
		.setDescription('tag')
		.setRequired(true)
		.addChoices(
			{ name: 'nohello', value: 'nohello' },
			{ name: 'XY Problem', value: 'xyproblem' },
			{ name: 'Teach to Fish', value: 'teach2fish' },
			{ name: 'No Screenshots', value: 'noscreenshots' },
			{ name: 'Codeblocks', value: 'codeblocks' },
			{ name: 'Bin', value: 'bin' },
			{ name: 'Google It', value: 'googleit' },
		),
	)
	.addUserOption((option) => option
		.setName('target')
		.setDescription('Pings targeted user!'),
	);

export default tagCommand.toJSON();

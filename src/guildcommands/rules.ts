import { SlashCommandBuilder } from '@discordjs/builders';

const rulesCommand = new SlashCommandBuilder()
	.setName('rules')
	.setDescription('View the rules for the Beaver Builders server')
	.setDMPermission(false)
	.addSubcommand((subcommand) => subcommand
		.setName('view')
		.setDescription('Views a single rule in detail')
		.addStringOption((option) => option
			.setName('rule')
			.setDescription('Choose a rule to view')
			.setRequired(true)
			.setChoices(
				{ name: 'Rule 1: Be nice and civil', value: 'rule1' },
				{ name: 'Rule 2: No NSFW and discussion on sensitive topics', value: 'rule2' },
				{ name: 'Rule 3: No discussion on illegal, unethical, or immoral programming topics', value: 'rule3' },
				{ name: 'Rule 4: Don\'t spam or post suspicious links', value: 'rule4' },
				{ name: 'Rule 5: Don\'t DM members for help', value: 'rule5' },
				{ name: 'Rule 6: Keep the chat English', value: 'rule6' },
				{ name: 'Rule 7: Try to help us help you', value: 'rule7' },
				{ name: 'Rule 8: Avoid using automated tools like ChatGPT to generate answers', value: 'rule8' },
				{ name: 'Rule 9: Follow Discord\'s Community Guidelines and Terms of Service', value: 'rule9' },
				{ name: 'Rule 10: Have fun!', value: 'rule10' },
			)
		)
	)
	.addSubcommand((subcommand) => subcommand
		.setName('viewall')
		.setDescription('Views all rules in a list')
	);

export default rulesCommand.toJSON();

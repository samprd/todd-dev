// imports all neccesary modules for discord.js
import { config } from 'dotenv';
import { REST } from '@discordjs/rest';

import {
	Client,
	Routes,
	Events,
	EmbedBuilder,
	ChannelType,
	GatewayIntentBits,
} from 'discord.js';

import commandsList from './commands.js';

const ownerId = '835278133732048927';

// other bot information
const versionNo = '`Beta 1`';
const discordjsVersion = '`v14.14.1`';

const MESSAGES = '59022886456c8d3a3515396c002e5eab'; // Github Gist id for messages.json
const RULES = '7699fb29df4033bc70fe52de17f78849'; // Github Gist id for rules.json

async function getRule(index = 0) {
	let rule = 'Rule 0';
	let description = 'Unknown';

	try {
		const response = await fetch(`https://api.github.com/gists/${RULES}`);
		const data = await response.json();
		const file = data.files['rules.json'];
		const content = file.content;
		const jsonData = JSON.parse(content);

		rule = jsonData.rules[index];
		description = jsonData.descriptions[index];
	}
	catch (error) {
		console.error('Error fetching rules.json:', error);
	}

	return [rule, description];
}

async function getAllRules() {
	let ruleList = '';

	try {
		const response = await fetch(`https://api.github.com/gists/${RULES}`);
		const data = await response.json();
		const file = data.files['rules.json'];
		const content = file.content;
		const jsonData = JSON.parse(content);

		for (let index = 0; index < jsonData.rules.length; index++) {
			const rule = `${index + 1}. ${jsonData.rules[index]}\n`;
			ruleList = ruleList.concat(rule);
		}
	}
	catch (error) {
		console.error('Error fetching rules.json:', error);
	}

	return ruleList;
}

config();

// token of the bot
const TOKEN = process.env.BOT_TOKEN;
// client id of the application
const CLIENT_ID = process.env.CLIENT_ID;
// Beaver Builders guild id
const GUILD_ID = process.env.GUILD_ID;

const PEXELS_API = process.env.PEXELS_API;

// creates client with intents and presence
const client = new Client({
	intents: [
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.Guilds,
	],
});

// creates instance of REST(v10) using token
const rest = new REST({ version: '10' }).setToken(TOKEN);

const botName = 'Todd the Beaver';

client.on('ready', c => console.log(`${c.user.username} has logged in!`));

client.on(Events.InteractionCreate, async (interaction) => {
	// returns if interaction is not a chat input command
	if (!interaction.isChatInputCommand()) return;

	switch (interaction.commandName) {
	case 'ping': {
		const uptime = Math.floor((Date.now() - startTime) / 1000);
		const uptimeSeconds = (uptime % 60).toString();
		const uptimeMinutes = (Math.floor(uptime / 60) % 60).toString();
		const uptimeHours = (Math.floor(uptime / (60 * 60)) % 24).toString();
		const uptimeDays = Math.floor(uptime / (60 * 60 * 24)).toString();

		const pingEmbed = new EmbedBuilder()
			.setTitle('Pong!')
			.setFields(
				{ name: 'Ping', value: `${Math.abs(Date.now() - interaction.createdTimestamp)}ms`, inline: true },
				{ name: 'Latency', value: `${client.ws.ping}ms`, inline: true },
				{ name: 'Uptime', value: `${uptimeDays}d ${uptimeHours}h ${uptimeMinutes}m ${uptimeSeconds}s`, inline: true },
				{ name: 'Server Count', value: `${client.guilds.cache.size} servers`, inline: true },
			)
			.setColor(0xdddddd);
		await interaction.reply({ embeds: [pingEmbed] });

		break;
	} // ping command
	case 'beaver': {
		fetch('https://api.pexels.com/v1/search?query=beaver&per_page=20', {
			headers: {
				Authorization: PEXELS_API,
			},
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				const photos: any[] = data.photos;

				const originalImageLinks = photos.map(photo => photo.src.original);
				const photographers = photos.map(photo => photo.photographer);
				const photoAvgColour = photos.map(photo => photo.avg_color);

				const index = Math.floor(Math.random() * 20);

				const beaverEmbed = new EmbedBuilder()
					.setTitle('Beaver!')
					.setImage(originalImageLinks[index])
					.setThumbnail('https://help.pexels.com/hc/en-us/article_attachments/900007787843')
					.setColor(photoAvgColour[index])
					.setFooter({
						text: `Photo by ${photographers[index]} on Pexels`,
					});

				interaction.reply({ embeds: [beaverEmbed] });
			});

		break;
	} // beaver image command
	case 'tag': {
		const tag = interaction.options.getString('tag');
		const target = interaction.options.getUser('target');

		let name = 'title';
		let description = 'description';
		let url = null;

		switch (tag) {
		case 'nohello': {
			name = 'nohello';
			description = '> Please don\'t just say Hello/Hi in chat when you have a question.';
			url = 'https://nohello.net';
			break;
		}
		case 'xyproblem': {
			name = 'The XY Problem';
			description = '> The XY problem is asking about your attempted solution rather than your actual problem.';
			url = 'https://xyproblem.info/';
			break;
		}
		case 'teach2fish': {
			name = 'Give someone a fish, and you\'ll feed them for a day. Teach someone to fish, and you\'ll feed them for a lifetime.';
			description = '> Teaching you the logic behind the answer instead of spoonfeeding it will enable you to learn and solve similar problems independently, ultimately saving you time in the future.';
			break;
		}
		case 'noscreenshots': {
			name = 'No screenshots of code';
			description = '> They\'re hard to read and correct, instead, you should use codeblocks for small amounts of code(`/tag codeblocks`) or external repos for larger amounts(`/tag bin`).';
			break;
		}
		case 'bin': {
			name = 'Use external repos';
			description = '> Use things like https://sourceb.in, https://gist.github.com, or https://hatebin.com/ to share large amounts of code!';
			break;
		}
		case 'codeblocks': {
			name = 'Use codeblocks';
			description = '> You can format your code as codeblocks with ``` to look like this:\n```py\nprint(\'hello world\')\n```';
			break;
		}
		case 'googleit': {
			name = 'Try Googling It';
			description = '> Before you ask a question on the server, try searching on Google or Stack Overflow first!';
			break;
		}
		default: {
			name = 'Unknown Tag';
			description = 'Error: tag not found!';
			break;
		}
		}

		const tagEmbed = new EmbedBuilder()
			.setTitle(name)
			.setDescription(description)
			.setURL(url)
			.setColor(0xdda646);

		if (target) {
			interaction.reply({ content: `<@${target.id}>`, embeds: [tagEmbed] });
		}
		else {
			interaction.reply({ embeds: [tagEmbed] });
		}

		break;
	}
	case 'mdndocs': {
		const query = interaction.options.getString('query') || 'javascript';

		const mdnEmbed = new EmbedBuilder()
			.setTitle('Query searched!')
			.setColor(0xff0000);

		interaction.reply({ embeds: [mdnEmbed] });

		break;
	} // searches the MDN web docs
	case 'rules': {
		switch (interaction.options.getSubcommand()) {
		case 'view': {
			const ruleId = interaction.options.getString('rule');
			let ruleIndex;

			switch (ruleId) {
			case 'rule1': {
				ruleIndex = 0;
				break;
			}
			case 'rule2': {
				ruleIndex = 1;
				break;
			}
			case 'rule3': {
				ruleIndex = 2;
				break;
			}
			case 'rule4': {
				ruleIndex = 3;
				break;
			}
			case 'rule5': {
				ruleIndex = 4;
				break;
			}
			case 'rule6': {
				ruleIndex = 5;
				break;
			}
			case 'rule7': {
				ruleIndex = 6;
				break;
			}
			case 'rule8': {
				ruleIndex = 7;
				break;
			}
			case 'rule9': {
				ruleIndex = 8;
				break;
			}
			case 'rule10': {
				ruleIndex = 9;
				break;
			}
			default: {
				ruleIndex = 0;
				break;
			}
			}

			const rule = await getRule(ruleIndex);

			const ruleEmbed = new EmbedBuilder()
				.setTitle(rule[0])
				.setDescription(rule[1])
				.setColor(0x997e54);

			interaction.reply({ embeds: [ruleEmbed] });

			break;
		}
		case 'viewall': {
			const ruleList = await getAllRules();

			const ruleListEmbed = new EmbedBuilder()
				.setTitle('Rules:')
				.setDescription(ruleList)
				.setColor(0x997e54);

			interaction.reply({ embeds: [ruleListEmbed] });

			break;
		}
		}

		break;
	}
	default: {
		const errorEmbed = new EmbedBuilder()
			.setTitle('Command does not exist!')
			.setColor(0xff0000);

		interaction.reply({ embeds: [errorEmbed] });

		break;
	}
	}
});

client.on(Events.GuildMemberAdd, async (member) => {
	if (member.guild.id != GUILD_ID) return;

	try {
		const response = await fetch(`https://api.github.com/gists/${MESSAGES}`);
		const data = await response.json();
		const file = data.files['messages.json'];
		const content = file.content;
		const jsonData = JSON.parse(content);

		// Get a random join message index
		const randomIndex = Math.floor(Math.random() * jsonData.joinMessages.length);

		// Get the random join message
		const randomJoinMessage = jsonData.joinMessages[randomIndex];

		// Insert the user's username into the join message
		const formattedJoinMessage = randomJoinMessage.replace('{userName}', `<@${member.user.id}>`);

		const channel = client.channels.cache.get('1174309146816950303'); // #new-beavers
		if (channel && channel.type == ChannelType.GuildText) {
			channel.send(formattedJoinMessage);
		}

	}
	catch (error) {
		console.error('Error fetching messages.json:', error);
	}
});

async function main() {
	// sets all commands
	const commands = commandsList[0];
	const guildCommands = commandsList[1];

	try {
		console.log(`Started refreshing application (/) commands for ${botName}.`);

		// loads guild commands to SkoopySquad and Skoopy's Workshop
		await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: guildCommands },
		);
		console.log(`Loaded ${guildCommands.length} guild commands onto Beaver Builders!`);

		// refreshes global commands
		await rest.put(Routes.applicationCommands(CLIENT_ID), {
			body: commands,
		});
		console.log(`Loaded ${commands.length} commands!`);

		// login using bot token
		client.login(TOKEN);
	}
	catch (err) {
		// error handler
		console.log(err);
	}
}

const startTime = Date.now();

// run main function
main();

// imports all neccesary modules for discord.js
import { config } from 'dotenv';
import { REST } from '@discordjs/rest';

import {
	Client,
	Routes,
	Events,
	EmbedBuilder,
} from 'discord.js';

import commandsList from "./commands.js";

const ownerId = '835278133732048927';

// other bot information
const versionNo = '`Beta 1`';
const discordjsVer = '`v14.14.1`';

config();

// token of the bot
const TOKEN = process.env.BOT_TOKEN;
// client id of the application
const CLIENT_ID = process.env.CLIENT_ID;
// Beaver Builders guild id
const GUILD_ID = process.env.GUILD_ID;

// creates client with intents and presence
const client = new Client({
	intents: [],
});

// creates instance of REST(v10) using token
const rest = new REST({ version: '10' }).setToken(TOKEN);

const botName = "Todd the Beaver";

client.on("ready", c => console.log(`${c.user.username} has logged in!`));

client.on(Events.InteractionCreate, async (interaction) => {
	// returns if await interaction is not a chat input command
	if (!interaction.isChatInputCommand()) return;

	switch (interaction.commandName){
		case "hello": {
			const helloEmbed = new EmbedBuilder()
				.setTitle(`Hi there, I'm ${botName}! Beavers are the best!`)
				.setColor(0xffff00);
			
			interaction.reply({ embeds: [helloEmbed] });

			break;
		}
		default: {
			const errorEmbed = new EmbedBuilder()
				.setTitle("Command does not exist!")
				.setColor(0xff0000);
			
			interaction.reply({ embeds: [errorEmbed] });
		}
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

const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const { clientId, guildId } = require('./config.json');
const fs = require('node:fs');
const Fs = require('node:fs');
const ms = require("ms")
const { readdirSync } = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const pogger = require("pogger");
const colors = require("colors");
const Enmap = require("enmap");
const db = require("quick.db");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], disableMentions: "everyone"
});

client.db = require("quick.db");

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('<b>Host is Ready.</b>'));

app.listen(port, () =>
	console.log(` ✔ `.bold.brightGreen + `[Server]: `.yellow + `Ready! `.bold.brightGreen + `https://localhost:${port}`.grey)
);

//
client.commands = new Collection();
const commands = [];
const commandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./slashCommands/${file}`);
	commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log(` ✔ `.bold.brightGreen + '[Handler]: '.yellow + 'Refreshing application (/) commands...'.blue);

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(` ✔ `.bold.brightGreen + '[Handler]: '.yellow + 'Reloaded and Registered (/) Succesfully!'.bold.brightGreen);
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(client, interaction);
	} catch (error) {
    const ConsoleIDErrorGen = Math.floor(Math.random() * 9999999) + 1;

		console.log(`[Error]:`.bold.red + ` (${ConsoleIDErrorGen})\n${error}`);

    const embedErr = new MessageEmbed()
      .setTitle("Command Execution Failed.")
      .setDescription(`Unfortunality, **I can't Execute this Command!** The Error has been Logged on The Console.`)
      .addFields({ name: "Error ID:", value: `\`${ConsoleIDErrorGen}\``})
      .setColor("RED")
      .setFooter(`Please Contact the Developers to Report this Problem.`)
      .setTimestamp();

		await interaction.reply({ embeds: [embedErr], ephemeral: true });
	}
});

for(const file of readdirSync("./events")) {
    if(file.endsWith(".js")) {
        const content = require(`./events/${file}`)
        const key = file.substring(0, file.length - 3);

        client.on(key, content.bind(null, client));
    }
}

client.login(process.env.TOKEN);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const { clientName } = require("../config.json")

module.exports = {
	data: new SlashCommandBuilder()
	.setName('bugreport')
	.setDescription('Report a bug')
    .addStringOption(option => option
      .setName('description')
			.setDescription('Tell us about the bug')
			.setRequired(true))
    .addStringOption(option => option
      .setName('platform')
      .setDescription('The platform you experienced this bug on')
      .setRequired(true)
			 .addChoice('Android', 'Android')
			 .addChoice('IOS', 'IOS')
       .addChoice('IOS (TestFlight)', 'IOS (TestFlight)')
       .addChoice('Desktop (Win x64)', 'Desktop (Win x64)')
       .addChoice('Desktop (Win x32)', 'Desktop (Win x32)')  
       .addChoice(`Web Client (Browser)`, `Web Client (Browser)`)
       .addChoice('MacOS', 'MacOS')
      ),
	async execute(client, interaction) {
    const description = interaction.options.getString('description');
		const platform = interaction.options.getString('platform');
    const ID = Math.floor(Math.random() * 9999999) + 1;

    const embed = new MessageEmbed()
      .setTitle(`New Report`)
      .setDescription(`**Report**\n\`\`\`${description}\`\`\``)
      .addFields({ name: `Platform`, value: `\`\`\`${platform}\`\`\`` })
      .setTimestamp()
      .setColor(`36393F`)
	    .setFooter({ text: `User ID: ${interaction.member.user.id} • Issue ID: ${ID}` });

    interaction.reply(`Your Report has been sent, Thank you!`)
    client.channels.cache.get('1007913178925105193').send({ embeds: [embed] })
    
	},
};
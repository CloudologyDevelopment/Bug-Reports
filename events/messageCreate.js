const pogger = require("pogger");
const colors = require("colors");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  /* if (message.content.match(new RegExp(`^<@!?${client.user.id}>`))) {

    const embed = new MessageEmbed()
      .setTitle(`Coming Soon`)
    
    return message.reply({ embeds: [embed] })
  }  */
};
console.log(` ✔ `.bold.brightGreen + "[Event]:".yellow + "messageCreate.js".blue + "(Loaded)".grey)
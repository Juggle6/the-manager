const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const pingMessage = await interaction.reply("Pinging... :thinking:");
    interaction.editReply(`Pong! ${pingMessage.createdTimestamp - interaction.createdTimestamp}ms`);
  },
};

const { SlashCommandBuilder, ActionRowBuilder } = require('discord.js'); // Action row and slash command
const { ButtonBuilder, ButtonStyle } = require('discord.js'); // Buttons
const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js'); // String Select Menu
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Socialize with a robot."),
  async execute(interaction) {
    await interaction.reply("Reading the dictionary... :book:")
    await wait(4000);
    await interaction.editReply("Aha! I've got it. Oui! Je suis une baguette.");


    // Create some buttons for the user to interact with
    const good = new ButtonBuilder()
      .setCustomId('good')
      .setLabel("Excellent")
      .setStyle(ButtonStyle.Success);

    const bad = new ButtonBuilder()
      .setCustomId('bad')
      .setLabel("Horrible")
      .setStyle(ButtonStyle.Danger);

    const buttons = new ActionRowBuilder()
      .addComponents(good, bad);

    const select = new StringSelectMenuBuilder()
      .setCustomId('select')
      .setPlaceholder('Make a selection!')
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel('Build an embed')
          .setDescription("Build an embedded message which I will post on your behalf.")
          .setValue('embed'),
        new StringSelectMenuOptionBuilder()
          .setLabel("Assign yourself a role")
          .setDescription("Start assigning yourself vanity roles on the server.")
          .setValue('roles'),
        new StringSelectMenuOptionBuilder()
          .setLabel("Contact staff")
          .setDescription("Contact staff to send feedback, report a user, or something else.")
          .setValue("staff"),
      );

    const selectRow = new ActionRowBuilder()
      .addComponents(select);

    await interaction.followUp({
      content: "Was that good?",
      components: [buttons, selectRow],
    });
  }
}

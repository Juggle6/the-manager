const { SlashCommandBuilder, ActionRowBuilder, ComponentType } = require('discord.js');
const { ButtonBuilder, ButtonStyle } = require('discord.js');
const { RoleSelectMenuBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription("Set up a role reaction message."),
  async execute(interaction) {
    // "submitRow" component row
    // Create the "submit" button
    const submit = new ButtonBuilder()
      .setCustomId('submit')
      .setLabel('Submit')
      .setStyle(ButtonStyle.Success);

    const cancel = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Danger);

    // Create component row for it
    const submitRow = new ActionRowBuilder()
      .addComponents(cancel, submit);


    // Role selection component row
    // Create the role select menu
    const roleSelect = new RoleSelectMenuBuilder()
      .setCustomId('setupRoleSelect')
      .setPlaceholder('Select roles to be assigned')
      .setMinValues(1)
      .setMaxValues(25);

    const roleRow = new ActionRowBuilder()
      .addComponents(roleSelect);


    // Select roles
    const response = await interaction.reply({
      content: "Ah! I see. So you want to allow your users to assign themselves roles. :thinking: Let's set this up together.\n\nWhat roles would you like your users to be able to choose from?",
      components: [roleRow, submitRow]
    })

    const collector = response.createMessageComponentCollector({ componentType: ComponentType.RoleSelect, time: 3_600_000 });

    collector.on('collect', async i => {
      const selection = i.values;

      let message = `${i.user} has selected:\n\n`;
      for (const roleId of selection) {
        message += `* <@&${roleId}>\n`;
      }
      await i.update({content: message });
    })
  }
}

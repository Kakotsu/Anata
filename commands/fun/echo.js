const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: 'echo',
  description: 'Make Anata send your message.',
  args: true,
  
  usage: '<message>',
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Make Anata send your message.')
    .addStringOption(option =>
      option.setName('content')
        .setDescription('What I\'ll be sending.')
        .setRequired(true)),
  async execute(message, args) {
    const content = args.join(' ');
    await message.reply(content);
  },
  async slashExecute(interaction, client) {
    interaction.reply(interaction.options.getString('content'));
  }
};
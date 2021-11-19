const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: 'echo',
    description: 'Make Anata send your message.',
    args: true,
    guildOnly: true,
    usage: '<message>',
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Make Anata send your message.')
        .addStringOption(option =>
            option.setName('content')
            .setDescription('What you\'ll be making Anata send.')
            .setRequired(true)),
    async execute(message, ) {
        const optionValue = message.options.getString('content')
        message.reply(optionValue)
    }
}
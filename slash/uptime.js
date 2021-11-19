const randomEmbedMessage = require('../functions/randomEmbedMessage');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: 'uptime',
    description: 'Display Anata\'s uptime.',
    usage: '',
    guildOnly: true,
    data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Display Anata\'s uptime.'),
    async execute(interaction, client) {
        
        interaction.deferReply();

        let embed = randomEmbedMessage({
            title: 'Anata - Uptime',
            color: 2767506,
            description: `${client.secondsToHms(Math.floor(process.uptime()))}`

        });
        interaction.followUp({ embeds: [embed] });
    },
};

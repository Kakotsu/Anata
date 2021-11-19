const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: 'avatar',
    description: 'Get a member\'s or your own avatar.',
    usage: '<mention>',
    guildOnly: true,
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get a member\'s or your own avatar.')
        .addUserOption(option =>
            option.setName('member')
            .setDescription('Mention a member to get their avatar')),
    async execute(message) {
        const bababoey = message.options.getUser('member')
        const target = message.options.getUser('member') !== null ? message.options.getUser('member') : message.user
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${target.username}'s avatar:`)
            .setImage(target.displayAvatarURL({ dynamic: true }))
            .setDescription('')

        await message.reply({ embeds: [embed], ephemeral: `${bababoey === null? true : ''}` })
    }
}
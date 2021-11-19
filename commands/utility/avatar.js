const getUserFromString = require('../../functions/getUserFromString');
const Discord = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'Get a member\'s or your own avatar.',
  usage: '<mention>',
  guildOnly: true,
  async execute(message, args) {
    const user = args.length
    ? getUserFromString(args[0], message)
    : message.author;
    let target = message.mentions.users.first()
    if (target !== message.author) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`${user.username}'s avatar`)
            .setImage(user.displayAvatarURL([]))
            .setDescription('')
        await message.reply({embeds: [embed]})
    } else {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${message.author.username}'s avatar:`)
            .setImage(message.author.displayAvatarURL([]))
            .setDescription('')

            message.reply({embeds: [embed]});
        }
    }
}

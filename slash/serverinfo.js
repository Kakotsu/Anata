const randomEmbedMessage = require('../functions/randomEmbedMessage');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  name: 'serverinfo',
  description: 'Get information of the current server.',
  guildOnly: true,
  data: new SlashCommandBuilder()
  .setName('serverinfo')
  .setDescription('Get information of the current server.'),
  execute(message, client) {
    let embed = randomEmbedMessage({
      title: ':desktop: Server Info',
      color: 2767506,
      thumbnail: {
        url: message.guild.iconURL({dynamic: true}),
      },
      fields: [
        {
          name: ':question: Server Name',
          value: message.guild.name,
        },
        {
          name: ':people_hugging: Total Members',
          value: message.guild.memberCount.toString(),
        },
        {
          name: ':clock3: Server was created...',
          value: `<t:${Math.floor(message.guild.createdAt / 1000)}>`,
        },
        {
          name: ':crown: Server Owner',
          value: `${client.users.cache.get(message.guild.ownerId).username}#${client.users.cache.get(message.guild.ownerId).discriminator}`,
        },
      ],
    })
    message.reply({embeds: [embed]})
  },
};

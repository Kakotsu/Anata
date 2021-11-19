const randomEmbedMessage = require('../functions/randomEmbedMessage');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  name: 'userinfo',
  description: 'Get information about a user.',
  guildOnly: true,
  usage: '[user]',
  data: new SlashCommandBuilder()
  .setName('userinfo')
  .setDescription('Get information about a user.')
  .addUserOption(option =>
    option.setName('member')
        .setDescription('Mention a member to get their user info')),
  execute(message) {
		const target = message.options.getUser('member')
    const author = message.member
    // This is where the spaghetti code starts.
    if (target === null) {
      let embed = randomEmbedMessage({
        title: ':person_standing: User Info',
        color: 2767506,
        thumbnail: {
          url: author.user.displayAvatarURL([]),
        },
        fields: [
          {
            name: ":question: User's Name",
            value: author.user.tag,
          },
          {
            name: ":one: User's ID",
            value: author.user.id,
          },
          {
            name: ":person_standing: User Type:",
            value: "Human",
          },
          {
            name: ":frame_photo: User's Avatar",
            value: author.user.displayAvatarURL([]),
          },
          {
            name: ':clock3: Account Creation',
            value: `<t:${Math.floor(author.user.createdAt / 1000)}>`,
          },
        ],
      });
      message.reply({ embeds: [embed], ephemeral: true });
    } else {
      if(target !== message.member) { 
      if (target.bot == false) {
      let embed = randomEmbedMessage({
        title: ':person_standing: User Info',
        color: 2767506,
        thumbnail: {
          url: target.displayAvatarURL([]),
        },
        fields: [
          {
            name: ":question: User's Name",
            value: target.tag,
          },
          {
            name: ":one: User's ID",
            value: target.id,
          },
          {
            name: ":person_standing: User Type:",
            value: "Human",
          },
          {
            name: ":frame_photo: User's Avatar",
            value: target.displayAvatarURL([]),
          },
          {
            name: ':clock3: Account Creation',
            value: `<t:${Math.floor(target.createdAt / 1000)}>`,
          },
        ],
      });
      message.reply({embeds: [embed]});
        } else if (target.bot == true) {
          let embed = randomEmbedMessage({
            title: ':person_standing: User Info',
            color: 2767506,
            thumbnail: {
              url: target.displayAvatarURL([]),
            },
            fields: [
              {
                name: ":question: User's Name",
                value: target.tag,
              },
              {
                name: ":one: User's ID",
                value: target.id,
              },
              {
                name: ":person_standing: User Type:",
                value: 'Bot',
              },
              {
                name: ":frame_photo: User's Avatar",
                value: target.displayAvatarURL([]),
              },
              {
                name: ':clock3: Account Creation',
                value: `<t:${Math.floor(target.createdAt / 1000)}>`,
              },
            ],
          });
          message.reply({embeds: [embed]});
        }
      };
    }
  }
}

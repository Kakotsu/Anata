const getUserFromString = require('../../data/functions/getUserFromString');
const randomEmbedMessage = require('../../data/functions/randomEmbedMessage');

module.exports = {
  name: 'userinfo',
  description: 'Get information about a user.',
  usage: '[user]',
  execute(message, args) {
    const user = args.length
      ? getUserFromString(args[0].replace(/<@!(.*?)>/g, ''), message)
      : message.author;

    if (!user) return message.reply('The user provided is invalid.');

    let embed = randomEmbedMessage({
      title: ':person_standing: User Info',
      color: 2767506,
      thumbnail: {
        url: user.displayAvatarURL([]),
      },
      fields: [
        {
          name: ":question: User's Name",
          value: user.tag,
        },
        {
          name: ":one: User's ID",
          value: user.id,
        },
        {
          name: ":person_standing: User Type:",
          value: "Human",
        },
        {
          name: ":frame_photo: User's Avatar",
          value: user.displayAvatarURL([]),
        },
        {
          name: ':clock3: Account Creation',
          value: `<t:${Math.floor(user.createdAt / 1000)}>`,
        },
      ],
    });
    message.reply({ embeds: [embed] });
  }
}

const getUserFromString = require('../../functions/getUserFromString');
const randomEmbedMessage = require('../../functions/randomEmbedMessage');

module.exports = {
  name: 'userinfo',
  description: 'Get information about a user.',
  guildOnly: true,
  usage: '[user]',
  execute(message, args) {
    const user = args.length
      ? getUserFromString(args[0], message)
      : message.author;
    let target = message.mentions.users.first()
    // This is where the spaghetti code starts.
    if (typeof(target) != 'object') {
      console.log(`[UserInfo] ${message.author.tag} (${message.author.id}) (No Mention, Human), ${user.bot} (False = Human | True = Bot)`)
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
      message.channel.send({embeds: [embed]});
    } else {
      if (target !== message.author) {
      if (user.bot == false) {
      console.log(`[UserInfo] ${message.author.tag} (${message.author.id}) (Mentioned, Human), ${user.bot} (False = Human | True = Bot)`)
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
      message.channel.send({embeds: [embed]});
        } else if (user.bot == true) {
          console.log(`[UserInfo] ${message.author.tag} (${message.author.id}) (Mentioned, Bot), ${user.bot} (False = Human | True = Bot)`)
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
                value: "Bot",
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
          message.channel.send({embeds: [embed]});
        }
      };
    }
  }
}

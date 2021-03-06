const getUserFromString = require('../../data/functions/getUserFromString');
const randomEmbedMessage = require('../../data/functions/randomEmbedMessage');

module.exports = {
  name: 'ban',
  description: 'Smash the ban hammer',
  args: true,
  usage: '<user> [reason]',
  
  permissions: ['BAN_MEMBERS'],
  botPermissions: ['BAN_MEMBERS'],
  execute(message, args) {
    const user = getUserFromString(args[0], message);
    const member = message.guild.members.cache.get(user);

    let reason = args;
    reason.shift();
    reason = reason.join(' ');

    if (!member)
      return message.reply(
        "I can't find that user. Please mention or give the id of that user."
      );

    const authorRolePos = message.member.roles.highest.position;
    const memberRolePos = member.roles.highest.position;

    if (message.author == user)
      return message.reply("Lmao don't ban yourself noob");

    if (memberRolePos >= authorRolePos)
      return message.reply(
        "You can't ban people with the same role or higher."
      );

    if (!member.bannable)
      return message.reply(
        'I do not have the permissions to ban this person. Ask an admin to move me up in the role hierachy.'
      );

    let embed = {
      title: `🦿 You were banned from ${message.guild.name}`,
      description: `Banned ${reason ? `for '${reason}'` : 'without a reason given.'
        }`,
      color: 2767506,
    };

    user
      .send({ embeds: [embed] })
      .catch(() => {
        message.reply(
          "I wasn't able to dm the user, but they still got banned."
        );
      })
      .then(() => {
        embed = randomEmbedMessage({
          title: '🦿 Banned member',
          description: `banned user ${user.tag}${reason ? ` for '${reason}'` : ''
            }`,
          color: 2767506,
        });

        member
          .ban()
          .then(() => message.reply({ embeds: [embed] }))
          .catch(() =>
            message.reply(
              `Unable to ban ${user.tag} for an unknown reason.`
            )
          );
      });
  },
};

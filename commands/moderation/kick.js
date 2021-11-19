const getUserFromString = require('../../functions/getUserFromString');
const randomEmbedMessage = require('../../functions/randomEmbedMessage');

module.exports = {
  name: 'kick',
  description: 'kick balls',
  args: true,
  usage: '<user> [reason]',
  guildOnly: true,
  permissions: ['KICK_MEMBERS'],
  botPermissions: ['KICK_MEMBERS'],
  execute(message, args) {
    const user = getUserFromString(args[0], message);
    const member = message.guild.member(user);

    let reason = args;
    reason.shift();
    reason = reason.join(' ');

    if (!member)
      return message.channel.send(
        "I can't find that user. Please mention or give the id of that user."
      );

    const authorRolePos = message.member.roles.highest.position;
    const memberRolePos = member.roles.highest.position;

    if (message.author == user)
      return message.channel.send("Lmao don't kick yourself noob");

    if (memberRolePos >= authorRolePos)
      return message.channel.send(
        "You can't kick people with the same role or higher."
      );

    if (!member.kickable)
      return message.channel.send(
        'I do not have the permissions to kick this person. Ask an admin to move me up in the role hierachy.'
      );

    let embed = {
      title: `🦿 You were kicked from ${message.guild.name}`,
      description: `Kicked ${
        reason ? `for '${reason}'` : 'without a reason given.'
      }`,
      color: 2767506,
    };

    user
      .send({embeds: [embed]})
      .catch(() => {
        message.channel.send(
          "I wasn't able to dm the user, but they still got kicked."
        );
      })
      .then(() => {
        embed = randomEmbedMessage({
          title: '🦿 Kicked member',
          description: `Kicked user ${user.tag}${
            reason ? ` for '${reason}'` : ''
          }`,
          color: 2767506,
        });

        member
          .kick()
          .then(() => message.channel.send({embeds: [embed]}))
          .catch(() =>
            message.channel.send(
              `Unable to kick ${user.tag} for an unknown reason.`
            )
          );
      });
  },
};

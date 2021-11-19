const getUserFromString = require('../../functions/getUserFromString');
const randomEmbedMessage = require('../../functions/randomEmbedMessage');

const Warn = require('../../models/Warn');

module.exports = {
  name: 'removewarn',
  description: 'Remove a warn from a member',
  args: true,
  usage: '<warnId>',
  guildOnly: true,
  permissions: ['MANAGE_MESSAGES'],
  async execute(message, args) {
    const warnId = args[0];

    const warn = await Warn.find({
      warnId,
      serverId: message.guild.id,
    });

    if (!warn.length) return message.channel.send("I can't find that warning.");

    const user = getUserFromString(warn[0].userId, message);
    const member = message.guild.member(user);

    if (!member)
      return message.channel.send(
        'I cannot find the user associated with this warning anymore.'
      );

    const authorRolePos = message.member.roles.highest.position;
    const memberRolePos = member.roles.highest.position;

    if (message.author == user)
      return message.channel.send("You can't remove warns from yourself.");

    if (memberRolePos >= authorRolePos)
      return message.channel.send(
        "You can't remove warns from people with the same role or higher."
      );

    await Warn.deleteOne({
      warnId,
    }).then(() => {
      const embed = randomEmbedMessage({
        title: '✅ Removed warn',
        description: `Succesfully removed warn ${warnId} from ${user.tag}.`,
      });

      message.channel.send({embeds: [embed]});
    });
  },
};

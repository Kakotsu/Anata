const getUserFromString = require('../../data/functions/getUserFromString');
const randomEmbedMessage = require('../../data/functions/randomEmbedMessage');

const Warn = require('../../data/models/Warn');

module.exports = {
  name: 'clearwarns',
  description: 'Clear all warnings from a member',
  args: true,
  usage: '<user>',
  
  permissions: ['MANAGE_MESSAGES'],
  async execute(message, args) {
    const user = getUserFromString(args[0], message);
    const member = message.guild.member(user);

    if (!member)
      return message.reply(
        "I can't find that user. Please mention or give the id of that user."
      );

    const authorRolePos = message.member.roles.highest.position;
    const memberRolePos = member.roles.highest.position;

    if (message.author == user)
      return message.reply("You can't remove warns from yourself.");

    if (memberRolePos >= authorRolePos)
      return message.reply(
        "You can't remove warns from people with the same role or higher."
      );

    await Warn.deleteMany({ userId: user.id.toString() })
      .then(({ deletedCount }) => {
        if (deletedCount == 0)
          return message.reply('This user has no warns.');

        const embed = randomEmbedMessage({
          title: `Removed all warns from ${user.tag}.`,
          description: `In total ${deletedCount} deleted.`,
          color: 2767506,
        });

        message.reply({ embeds: [embed] });
      })
      .catch((err) => {
        console.log(err);
        message.reply(
          `There was an issue saving the warn to my database. The issue has been reported. If it persists after a week, please ask for support in the Discord server using ${process.env.PREFIX}invite`
        );
      });
  },
};

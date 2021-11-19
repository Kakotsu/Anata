const { nanoid } = require('nanoid');

const getUserFromString = require('../../functions/getUserFromString');
const ordinalSuffix = require('../../functions/ordinalSuffix');
const randomEmbedMessage = require('../../functions/randomEmbedMessage');

const Warn = require('../../models/Warn');

module.exports = {
  name: 'warn',
  description: 'Warn a member',
  args: true,
  usage: '<user> [reason]',
  guildOnly: true,
  permissions: ['MANAGE_MESSAGES'],
  async execute(message, args) {
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
      return message.channel.send("You can't warn yourself.");

    if (memberRolePos >= authorRolePos)
      return message.channel.send(
        "You can't warn people with the same role or higher."
      );

    if (reason.length > 200)
      return message.channel.send(
        'That reason is too long! Please make it 200 characters or less.'
      );

    const warn = new Warn({
      ...{
        warnId: nanoid(5),
        userId: user.id,
        moderatorId: message.author.id,
        serverId: message.guild.id,
        date: new Date(),
      },
      ...(reason && { reason }),
    });

    const amountOfWarns = await Warn.find({
      userId: user.id,
      serverId: message.guild.id,
    }).countDocuments((err, count) => {
      return count;
    });

    warn
      .save()
      .then((savedDoc) => {
        const embed = randomEmbedMessage({
          title: `Warned ${user.username}`,
          description: `Warned ${user.tag}${
            reason ? ` for '${reason}'` : ''
          }. This is their ${ordinalSuffix(amountOfWarns + 1)} warning.`,
          color: 2767506,
        });

        message.channel.send({embeds: [embed]}).then(() => {
          const embed = randomEmbedMessage({
            title: `You were warned in ${message.guild.name}`,
            description: `You were warned ${
              reason ? `for '${reason}'` : 'without a reason given'
            }. This is your ${ordinalSuffix(amountOfWarns + 1)} warning.`,
            color: 2767506,
          });

          user.send({embeds: [embed]}).catch(() => {
            message.channel.send(
              "I can't dm the user, but they were still warned."
            );
          });
        });
      })
      .catch((err) => {
        console.log(err);
        message.channel.send(
          `There was an issue saving the warn to my database. The issue has been reported. If it persists after a week, please ask for support in the Discord server using ${process.env.PREFIX}invite`
        );
      });
  },
};

const { MessageEmbed } = require('discord.js');

const getUserFromString = require('../../functions/getUserFromString');
const randomEmbedMessage = require('../../functions/randomEmbedMessage');

const Warn = require('../../models/Warn');

module.exports = {
  name: 'warns',
  description: 'See all warns a member has',
  args: true,
  usage: '<user>',
  guildOnly: true,
  permissions: ['MANAGE_MESSAGES'],
  async execute(message, args) {
    const user = getUserFromString(args[0], message);
    const member = message.guild.member(user);

    if (!member)
      return message.channel.send(
        "I can't find that user. Please mention or give the id of that user."
      );

    const authorRolePos = message.member.roles.highest.position;
    const memberRolePos = member.roles.highest.position;

    if (memberRolePos > authorRolePos)
      return message.channel.send("You can't warn people with a higher role.");

    const warns = await Warn.find({
      userId: user.id,
      serverId: message.guild.id,
    });

    if (!warns.length) {
      return message.channel.send('This member has no warns.');
    }

    const embed = randomEmbedMessage({
      title: `Warns for ${user.tag}`,
      fields: [],
      color: 2767506,
    });

    for (warn of warns) {
      embed.fields.push({
        name: `${warn.warnId} · <t:${Math.floor(warn.date / 1000)}>`,
        value: `Moderator: ${getUserFromString(warn.moderatorId, message)}${
          warn.reason ? `\nReason: '${warn.reason}'` : ''
        }`,
        inline: true,
      });
    }

    let removedListings = false;
    while (new MessageEmbed(embed).length > 5500 || embed.fields.length > 25) {
      embed.fields.pop();
      removedListings = true;
    }

    if (removedListings)
      embed.description =
        '⚠️ There are more warns, but this message is getting too long. Remove some warns to see the rest.';

    message.channel.send({embeds: [embed]});
  },
};

module.exports = {
  name: 'unban',
  description: 'Unban a member',
  args: true,
  usage: '<memberId>',
  guildOnly: true,
  permissions: ['BAN_MEMBERS'],
  execute(message, args) {
    const userId = args[0];

    if (!userId.match(/\d+/))
      return message.channel.send('Please provide the id of the member.');

    message.guild.members
      .unban(userId)
      .then((user) => {
        message.channel.send(`Successfully unbanned ${user.tag}`);
      })
      .catch(() => {
        message.channel.send("Couldn't unban. Did you type the id correctly?");
      });
  },
};

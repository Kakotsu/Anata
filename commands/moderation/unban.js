module.exports = {
  name: 'unban',
  description: 'Unban a member',
  args: true,
  usage: '<memberId>',
  
  permissions: ['BAN_MEMBERS'],
  execute(message, args) {
    const userId = args[0];

    if (!userId.match(/\d+/))
      return message.reply('Please provide the id of the member.');

    message.guild.members
      .unban(userId)
      .then((user) => {
        message.reply(`Successfully unbanned ${user.tag}`);
      })
      .catch(() => {
        message.reply("Couldn't unban. Did you type the id correctly?");
      });
  },
};

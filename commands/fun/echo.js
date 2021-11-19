const getUserFromString = require('../../functions/getUserFromString');
const randomEmbedMessage = require('../../functions/randomEmbedMessage');

module.exports = {
  name: 'echo',
  description: 'Make Anata send your message.',
  args: true,
  guildOnly: true,
  usage: '<message>',
  async execute(message, args) {
    const content = args.join(' ');
    await message.channel.send(content);
  },
};
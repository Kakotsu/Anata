module.exports = {
  name: 'purge',
  description: 'Delete a batch of messages.',
  args: true,
  usage: '<amountOfMessages>',
  guildOnly: true,
  permissions: ['MANAGE_MESSAGES'],
  botPermissions: ['MANAGE_MESSAGES'],
  execute(message, args) {
    const n = parseInt(args[0]) + 1
    if (isNaN(n))
        return message.reply('That isn\'t a valid number')
    else if(n <= 1 || n >= 100)
        return message.reply('You can only purge between 1 and 98 messages.')
    message.channel.bulkDelete(n, true),message.channel.send(`Deleted ${n} message...`).catch(error => {
        console.error(error)
        message.reply('Error deleting messages')
      })
  }
}

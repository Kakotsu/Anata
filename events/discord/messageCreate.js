module.exports = {
  name: 'messageCreate',
  execute(message, client) {

    if (message.content.startsWith9(process.env.PREFIX)) {
      if (message.author.bot) return;

      const args = message.content
        .slice(process.env.PREFIX.length)
        .trim()
        .split(' ');
      const commandName = args.shift().toLowerCase();
      const command = client.commands.get(commandName);
      if (!command) return message.reply('That command doesn\'t exist!');

      if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return;

      // Check if arguments are required and, if so, that the message has arguments
      if (command.args && !args.length) {
        let reply = `You didn't provide any arguments!`;

        if (command.usage) {
          reply += `\nUsage: \`${process.env.PREFIX}${command.name} ${command.usage}\``;
        }

        return message.reply(reply);
      }

      // Check if user has permissions
      if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);

        for (commandPerm of command.permissions) {
          if (!authorPerms || !authorPerms.has(commandPerm)) {
            return message.reply(
              `You don't have permissions to execute that command! You need the following permissions to do this:\n\`${command.permissions.join(
                '`, `'
              )}\``
            );
          }
        }
      }

      // Check if bot has permissions
      if (command.botPermissions) {
        const botPerms = message.channel.permissionsFor(client.user);

        for (commandPerm of command.botPermissions) {
          if (!botPerms || !botPerms.has(commandPerm)) {
            return message.reply(
              `The bot doesn't have permissions to do that! Ask an admin to add the following permissions:\n\`${command.botPermissions.join(
                '`, `'
              )}\``
            );
          }
        }
      }

      // Run the command
      try {
        command.execute(message, args, client);
      } catch (error) {
        console.error(error);
        message.reply(
          'Whoops, there was an error executing that command.'
        );
      }
    }
  },
};

const Discord = require('discord.js');

module.exports = {
  name: 'messageCreate',
  execute(message) {
    const client = message.client;

    if (message.author.bot) return;

    if (
      message.content.startsWith('<@861237525690712084>') || // Put your application id from https://discord.com/developers/applications/yourbot/information here
      message.content.startsWith('<@!861237525690712084>') // Repeat ^
    )
      return message.channel.send(`Hi! My prefix is \`${process.env.PREFIX}\``);

    if (!message.content.startsWith(process.env.PREFIX)) return;

    const args = message.content
      .slice(process.env.PREFIX.length)
      .trim()
      .split(' ');
    const commandName = args.shift().toLowerCase();

    // Check if command exists
    if (!client.commands.has(commandName))
      return message.channel.send('Command not found!');

    const command = client.commands.get(commandName);

    if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) {
      return;
    }

    // Check if guild only command is in dms
    if (command.guildOnly && message.channel.type === 'dm') {
      return message.channel.send("Sorry, but you can't use that in DM's!");
    }

    // Check if arguments are required and, if so, that the message has arguments
    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments!`;

      if (command.usage) {
        reply += `\nUsage: \`${process.env.PREFIX}${command.name} ${command.usage}\``;
      }

      return message.channel.send(reply);
    }

    // Handle cooldowns
    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0.5) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.channel.send(
          `Please wait ${timeLeft.toFixed(1)} seconds before using \`${
            command.name
          }\` again.`
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Check if user has permissions
    if (command.permissions) {
      const authorPerms = message.channel.permissionsFor(message.author);

      for (commandPerm of command.permissions) {
        if (!authorPerms || !authorPerms.has(commandPerm)) {
          return message.channel.send(
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
          return message.channel.send(
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
      message.channel.send(
        'Whoops, there was an error executing that command.'
      );
    }
  },
};

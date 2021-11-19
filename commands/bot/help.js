const fs = require('fs');

const randomEmbedMessage = require('../../functions/randomEmbedMessage');

const mainMenu = (client) => {
  let embed = randomEmbedMessage({
    title: '📄 Help | Main menu',
    description: `Use the \`${process.env.PREFIX}help <category|command>\` to learn more.`,
    color: 2767506,
    fields: [],
  });

  client.commandCategories.forEach((value) => {
    embed.fields.push({ name: value[0], value: value[1], inline: true });
  });

  return embed;
};

const categoryMenu = (input, client) => {
  let category = client.commandCategories.get(input);

  let embed = randomEmbedMessage({
    title: `📑 Help | ${category[0]}`,
    description: `Here are all commands in ${category[0]}`,
    color: 2767506,
    fields: [],
  });

  const commands = category[2];

  for (command of commands) {
    if (command.unlisted) continue;

    embed.fields.push({
      name: command.name,
      value: command.description,
      inline: true,
    });
  }

  return embed;
};

const commandMenu = (command) => {
  let embed = randomEmbedMessage({
    title: `🔧 Help | ${command.name}`,
    description: command.description,
    color: 2767506,
    fields: [],
  });

  if (command.usage) {
    embed.fields.push({
      name: 'Usage',
      value: `\`${process.env.PREFIX}${command.name} ${command.usage}\``,
    });
  } else {
    embed.fields.push({
      name: 'Usage',
      value: `\`${process.env.PREFIX}${command.name}\``,
    });
  }

  if (command.cooldown) {
    embed.fields.push({
      name: 'Cooldown',
      value: `${command.cooldown} seconds`,
    });
  }

  return embed;
};

module.exports = {
  name: 'help',
  description: 'Get a list of available commands.',
  usage: '[category | command]',
  execute(message, args) {
    if (!args.length) {
      return message.channel.send({ embeds: [mainMenu(message.client)] });
    }

    const input = args[0].toLowerCase();

    if (message.client.commandCategories.has(input)) {
      return message.channel.send({
        embeds: [categoryMenu(input, message.client)],
      });
    }

    const command = message.client.commands.get(input);
    if (command) {
      if (command.unlisted) return;
      return message.channel.send({ embeds: [commandMenu(command)] });
    }
  },
};

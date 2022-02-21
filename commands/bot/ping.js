const randomEmbedMessage = require('../../data/functions/randomEmbedMessage');

module.exports = {
  name: 'ping',
  description: 'Ping! Check Anata\'s latency.',
  
  execute(message, args) {
    let embed = randomEmbedMessage({
      title: ':ping_pong: Pong!',
      description: 'Hooray, it works!',
      color: 2767506,
      fields: [
        {
          name: '📲 Api Latency',
          value: 'Testing',
        },
        {
          name: '🕐 Full Latency',
          value: 'Testing',
        },
      ],
    });

    message.reply({ embeds: [embed] }).then((msg) => {
      embed.fields[0].value = `${Math.round(message.client.ws.ping)}ms`;
      embed.fields[1].value = `${msg.createdTimestamp - message.createdTimestamp
        }ms`;

      msg.edit({ embeds: [embed] });
    });
  },
  slashExecute(interaction, client) {
    let embed = randomEmbedMessage({
      title: ':ping_pong: Pong!',
      description: 'Hooray, it works!',
      color: 2767506,
      fields: [
        {
          name: '📲 Api Latency',
          value: 'Testing',
        },
        {
          name: '🕐 Full Latency',
          value: 'Testing',
        },
      ],
    });

    message.reply({ embeds: [embed] })
    const Interaction = interaction.fetchReply();
    embed.fields[0].value = `${Math.round(client.ws.ping)}ms`;
    embed.fields[1].value = `${Interaction.createdTimestamp - interaction.createdTimestamp
      }ms`;

    Interaction.edit({ embeds: [embed] });
  },
};

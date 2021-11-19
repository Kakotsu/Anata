const randomEmbedMessage = require('../../functions/randomEmbedMessage');

module.exports = {
  name: 'ping',
  description: 'Ping! Check Anata\'s latency.',
  guildOnly: true,
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

    // Send embed, then edit the embed with the right numbers
    message.channel.send({embeds: [embed]}).then((msg) => {
      embed.fields[0].value = `${Math.round(message.client.ws.ping)}ms`;
      embed.fields[1].value = `${
        msg.createdTimestamp - message.createdTimestamp
      }ms`;

      msg.edit({embeds: [embed]});
    });
  },
};

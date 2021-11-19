const Discord = require('discord.js');

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}

module.exports = {
        name: 'interactionCreate',
        async execute(interaction) {
            const client = interaction.client;
            client.user.setActivity(`games`, {
                type: "PLAYING",
            });

            if (interaction.isCommand()) {
                const command = client.slash.get(interaction.commandName);
                if (!command) return;
                try {
                    command.execute(interaction, client);
                } catch (e) {
                    console.error(e);
                    interaction.reply({
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    });
                }

                // Handle cooldowns
                const { cooldowns } = client;

                if (!cooldowns.has(command.name)) {
                    cooldowns.set(command.name, new Discord.Collection());
                }

                const now = Date.now();
                const timestamps = cooldowns.get(command.name);
                const cooldownAmount = (command.cooldown || 0.5) * 1000;

                if (timestamps.has(interaction.user.id)) {
                    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

                    if (now < expirationTime) {
                        const timeLeft = (expirationTime - now) / 1000;
                        return interaction.reply(`Please wait ${timeLeft.toFixed(1)} seconds before using \`${command.name}\` again.`);
                    }
                }

                timestamps.set(interaction.user.id, now);
                setTimeout(() => timestamps.delete(interaction.user.id),
                    cooldownAmount
                );

                // Check if user has permissions
                if (command.permissions) {
                    const authorPerms = interaction.channel.permissionsFor(
                        interaction.user
                    );

                    for (commandPerm of command.permissions) {
                        if (!authorPerms || !authorPerms.has(commandPerm)) {
                            return interaction.reply(`You don't have permissions to execute that command! You need the following permissions to do this:\n\`${command.permissions.join('`, `')}\``);
                        }
                    }
                }

                // Check if bot has permissions
                if (command.botPermissions) {
                    const botPerms = interaction.channel.permissionsFor(client.user);

                    for (commandPerm of command.botPermissions) {
                        if (!botPerms || !botPerms.has(commandPerm)) {
                            return interaction.reply(
                                `The bot doesn't have permissions to do that! Ask an admin to add the following permissions:\n\`${command.botPermissions.join('`, `')}\``
                            );
                        }
                    }
                }

            }
    }
};
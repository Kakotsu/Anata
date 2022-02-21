module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

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

            try {
                command.slashExecute(interaction, client);
            } catch (e) {
                console.error(e);
                interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                });
            }
        }

    }
};
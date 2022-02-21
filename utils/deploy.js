const { REST } = require('@discordjs/rest'); // Discord REST API
const { Routes } = require('discord-api-types/v9'); // Disord API
require('dotenv').config(); // Get enviorment variables

const token = process.env['TOKEN'] // Discord bot token
const rest = new REST().setToken(token); // Discord REST API
const fs = require('fs'); // File system

const commands = [];
const clientId = process.env['CLIENT_ID'] || '883027690683240488';
const guildId = process.env['GUILD_ID'] || '866087438077132850';

for (const folder of commandFolders) {
    const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        let data = command.data
        if (data) {
            data = data.toJSON();
            commands.push(data);
        }
    }
}

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
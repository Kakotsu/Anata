const { REST } = require('@discordjs/rest'); // Discord 
const { Routes } = require('discord-api-types/v9'); // Discord API stuff
require('dotenv').config(); // .env file stuff
const token = process.env.TOKEN // Gets the token from the .env file
const fs = require('fs'); // fs stuff

const commands = [];
const commandFiles = fs.readdirSync(`./slash`).filter(file => file.endsWith('.js')); // Gets files from the slash folder that end with .js

const clientId = '883027690683240488'; // Put your application id from https://discord.com/developers/applications/yourbot/information
const guildId = '876706169576652801'; // Put your server id by right clicking the icon and clicking copy ID. (Go to Settings -> Advanced -> Developer Mode. If copy ID doesn't show.)

for (const file of commandFiles) {
    const command = require(`./slash/${file}`); // Gets the files from the slash commands folder
    commands.push(command.data.toJSON());
}

const rest = new REST().setToken(token); // Gets the token from the token constant above (const token = process.env.TOKEN) which comes from the .env file.

(async() => {
    try {
        console.log('Started refreshing application (/) commands.'); // Tells you that it's refreshing...

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.'); // Tells you that it's reloaded...
    } catch (error) {
        console.error(error);
    }
})();

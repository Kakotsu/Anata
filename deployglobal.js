const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();
const token = process.env.TOKEN
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync(`./slash`).filter(file => file.endsWith('.js')); // Gets files from the slash folder that end with .js

const clientId = '883027690683240488'; // Put your application id from https://discord.com/developers/applications/yourbotapplicationid/information

    for (const file of commandFiles) {
       const command = require(`./slash/${file}`); // Gets the files from the slash command folder
       commands.push(command.data.toJSON());
 }
 
 const rest = new REST().setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.'); // Tells you that it's refreshing...

    await rest.put(
        Routes.applicationCommands(clientId),
        { body: commands },
    );
    

    console.log('Successfully reloaded application (/) commands.'); // Tells you that it's reloaded...
  } catch (error) {
    console.error(error);
  }
})();

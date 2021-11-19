// Anata bot
// Yes, there's a lot of spaghetti code.
// Feel free to fork and pull request :kannasip:

const Discord = require('discord.js'); // Discord.js stuff
const fs = require('fs'); // FS Stuff
const Spotify = require('node-spotify-api'); // Spotify stuff that probably doesn't need to be here :kekw:
const { execute } = require('./commands/utility/userinfo.js'); // Spaghetti code commands/utility/userinfo.js that probably doesn't need to be here :kekw:
const getUserFromString = require('./functions/getUserFromString'); // Getting user from string because yes that probably doesn't need to be here :kekw:
const { Intents } = require('discord.js'); // Intents for Discord.js stuff

/* Uncomment for database.
const mongoose = require('mongoose');
*/


// For .env file, client, and intents.
require('dotenv').config();
const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES],
    allowedMentions: { parse: ['users'] }
});

/* Uncomment for database.
mongoose.connect(process.env.MONGOURL);
const db = mongoose.connection;
*/

// Spotify API, Commands/Slash commands, Cooldowns...
client.spotifyCredentials = { id: process.env.SPOTIFY_ID, secret: process.env.SPOTIFY_SECRET }
client.commandCategories = new Discord.Collection();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.slash = new Discord.Collection();

client.admins = require('./data/admins.js'); // For commands only allowed by specific IDs

// You can see da stuff in commands/bot/uptime.js and slash/uptime.js for uptime
client.secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}

// Makes the slash folder a constnat then gets the files inside because yes. (Bully my comments)
const slashFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'))
for (const file of slashFiles) {
    const command = require(`./slash/${file}`)
    client.slash.set(command.data.name, command)
}

// Makes the commands and events/discord folder a constant then gets the .js files. (Bully my comments)
const commandFolders = fs.readdirSync('./commands');
const discordEventFiles = fs
    .readdirSync('./events/discord')
    .filter((file) => file.endsWith('.js'));

/* Uncomment for database.
  const mongoEventFiles = fs
  .readdirSync('./events/mongo')
  .filter((file) => file.endsWith('.js'));
*/


// For getting the juicy commands for Anata
for (const folder of commandFolders) {
    const data = JSON.parse(fs.readFileSync(`./commands/${folder}/data.json`));
    const name = data.name;
    const description = data.description;

    let commands = [];

    const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
        commands.push(command);
    }

    client.commandCategories.set(folder, [name, description, commands]);
}

// For interaction create, message create, ready.js
for (const file of discordEventFiles) {
    const event = require(`./events/discord/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

/* Uncomment for database.
for (const file of mongoEventFiles) {
  const event = require(`./events/mongo/${file}`);

  if (event.once) {
    db.once(event.name, () => {});
    event.execute(db);
  } else {
    db.on(event.name, () => {
      event.execute(db);
    });
  }
}
*/


client.login(process.env.TOKEN); // For logging into the bot with the sexy token.
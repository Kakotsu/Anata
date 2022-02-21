// Anata bot
// Yes, there's a lot of spaghetti code.

const { Client, Collection, Intents } = require('discord.js'); // Discord.js
const fs = require('fs'); // File system

require('dotenv').config(); // Get enviorment variables

/* Uncomment for database.
const mongoose = require('mongoose');
*/

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES],
    allowedMentions: { parse: ['users'] }
});

/* Uncomment for database.
mongoose.connect(process.env['MONGO_URL']);
const db = mongoose.connection;
*/

// Spotify and commands data...
client.spotifyCredentials = { id: process.env['SPOTIFY_ID'], secret: process.env['SPOTIFY_SECRET'] }
client.commandCategories = new Collection();
client.commands = new Collection();
client.models = {}

client.admins = require('./data/admins.js'); // For commands only allowed by specific IDs

client.secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    let result = hDisplay + mDisplay + sDisplay;
    if (result.endsWith(', ')) result = result.slice(0, -2);
    return result;
}

/* Uncomment for database.
  const mongoEventFiles = fs
  .readdirSync('./events/mongo')
  .filter((file) => file.endsWith('.js'));
*/

const commandFolders = fs.readdirSync('./commands');
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

const discordEventFiles = fs.readdirSync('./events/discord').filter((file) => file.endsWith('.js'));
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

/* Uncomment for database.
const models = fs.readdirSync('./data/models').filter((file) => file.endsWith('.js'))
for (const file of models) {
  const data = require(`./data/models/${file}`)
  const name = file.slice(0, -3)

  console.log(data)
  client.models[name] = data
}
*/

client.login(process.env['TOKEN']); // For logging into the bot with the sexy token.
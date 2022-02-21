// This code returns a random message to the embed it recieves

const _ = require('lodash');


const randomMessages = [
    `Edit randomEmbedMessage.js in functions folder for more footers`,
];

module.exports = (embed) => {
    // Get random message using Lodash sample function
    const message = _.sample(randomMessages);

    // Set the footer of the embed to the random message
    embed.footer = { text: message };

    return embed;
};
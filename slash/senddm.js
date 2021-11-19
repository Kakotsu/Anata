const getUserFromString = require('../functions/getUserFromString');
const {SlashCommandBuilder} = require('@discordjs/builders')
const Discord = require('discord.js');

module.exports = {
	name: 'senddm',
	description: 'Send DMs to a user.',
	guildOnly: true,
	usage: '<user> [message]',
	unlisted: false,
	data: new SlashCommandBuilder()
	.setName('senddm')
	.setDescription('Send DMs to a user.')
	.addUserOption(option =>
        option.setName('member')
            .setDescription('Mention a member to send your DM to')
			.setRequired(true))
	.addStringOption(option =>
		option.setName('content')
			.setDescription('What you want to send to the user')
			.setRequired(true)),
	async execute(message) {
		const member = message.options.getUser('member')
		const content = message.options.getString('content')

		message.reply({ content: 'Your message has been sent.', ephemeral: true })
		member.send(content)
	}
}
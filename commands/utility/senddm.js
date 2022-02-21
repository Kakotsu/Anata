const getUserFromString = require('../../data/functions/getUserFromString');

module.exports = {
	name: 'senddm',
	description: 'Send DMs to a user.',
	
	usage: '<user> [message]',
	unlisted: false,
	async execute(message, args, client) {
		const userr = args.length
			? getUserFromString(args[0], message)
			: message.author;
		message.react('796942775421370383')
		const argstring = args.join(' ');
		let user = message.mentions.users.first();
		console.log(user)
		if (typeof (user) != 'object') {
			try {
				user = client.users.cache.get(args[0])
			} catch (error) {
				console.log(error)
				return message.reply('Please mention a user!')
			}
		}
		if (typeof (user) != 'object') { return message.reply('Please mention a user!') }

		const content = argstring.replace(`<@!${user.id}>`, '').replace(user.id, "")

		if (content.length == 0) { return message.reply(`No arguments provided. Usage: ${process.env.PREFIX + this.name + ' ' + this.usage}`) }

		user.send(content)
		console.log()
	}
}
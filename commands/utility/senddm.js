const getUserFromString = require('../../functions/getUserFromString');

module.exports = {
	name: 'senddm',
	description: 'Send DMs to a user.',
	guildOnly: true,
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
		if(typeof(user) != 'object'){
			try {
				user = client.users.cache.get(args[0])
			} catch (error) {
				console.log(error)
				return message.channel.send('Please mention a user!')
			}
		}
		if(typeof(user) != 'object'){return message.channel.send('Please mention a user!')}
		
		const content = argstring.replace(`<@!${user.id}>`, '').replace(user.id, "")

		if(content.length == 0 ){return message.channel.send(`No arguments provided. Usage: ${process.env.PREFIX + this.name + ' ' + this.usage}`)}

		user.send(content)
		console.log()
	}
}

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log("Ready!")
        client.user.setActivity(`games`, { type: "PLAYING", });
    }
}
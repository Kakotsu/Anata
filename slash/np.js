const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed} = require('discord.js')
const Spotify = require('node-spotify-api')


module.exports = {
  data: new SlashCommandBuilder()
      .setName('np')
      .setDescription('Show your Spotify now playing!')
      .addUserOption(option =>
        option.setName('member')
            .setDescription('Mention a member to get their now playing')),
  async execute(interaction, client) {
    const spotify = new Spotify(client.spotifyCredentials) 
    const user = interaction.options.getUser('member')
    const activities = interaction.guild.presences.cache.get(interaction.options.getUser('member') ? user.id : interaction.user.id ).activities

    for (const activity of activities) {
      if (activity.id === 'spotify:1') {
        var nowPlaying = activity
      }
    }
    if (!nowPlaying) return interaction.reply('No song is currently playing!')
    else {
      const response = await spotify.request(`https://api.spotify.com/v1/tracks/${nowPlaying.syncId}`)
      const embed = new MessageEmbed() // credits to @Exerra for embed
      embed.setTitle(response.name)
      embed.setURL(response.external_urls.spotify)
      embed.setThumbnail(response.album.images[0].url)
      embed.setAuthor('Spotify', 'https://cdn.exerra.xyz/files/png/companies/spotify/240px-Spotify_logo_without_text.png')
      embed.addField('Monthly popularity', `${Math.trunc(response.popularity / 10)} / 10`)
      embed.addField('Album name', response.album.name)
      embed.addField('Album Type', response.album.album_type[0].toUpperCase() + response.album.album_type.slice(1))
      let artistName = 'Artist\'s name'
      if (response.album.artists.length != 1) {
        var a = [];
        for (i in response.album.artists) {
          a[i] = response.album.artists[i].name;
        }
        artistName = 'Artist\'s names'
        embed.addField(artistName, a.join('\n'))
      } else {
        embed.addField(artistName, response.album.artists[0].name)
      }
      embed.addField('Release Date', response.album.release_date + '\n(Year-Month-Day)', true)
      embed.addField('This is playing right now for', `${user !== null ? user: interaction.user}`)
      embed.setTimestamp()
      interaction.reply({embeds: [embed]})
    }
  }
}
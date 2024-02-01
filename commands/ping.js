const { SlashCommandBuilder, EmbedBuilder} = require("discord.js")

module.exports = {
    cooldown: 5, 
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Responde com o ping do bot"),

    async execute(interaction) {
        const embed = new EmbedBuilder()
        .setTitle("Pong! :ping_pong:")
        .setDescription(`O ping atual do bot é de: ${interaction.client.ws.ping}ms`)
        .setColor(`Ffffff`)

        interaction.reply({
            embeds: [embed]
        })
    }
}
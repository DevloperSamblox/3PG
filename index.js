//Importar bibliotecas
const { Client, GatewayIntentBits, Events, Collection } = require("discord.js")
const colors = require("colors")
const path = require("node:path")
const fs = require("node:fs")
const client = new Client({
    intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

//configuração do handler
const pastacomandos = path.join(__dirname, "commands")
const arquivocomandos = fs.readdirSync(pastacomandos).filter(file => file.endsWith(".js"))
client.commands = new Collection()

//associar comandos
for(const file of arquivocomandos) {
    const pastaarquivo = path.join(pastacomandos, file)
    const comando = require(pastaarquivo)

    if("data" in comando && "execute" in comando) {
        client.commands.set(comando.data.name, comando)
    } else {
        console.log("comando com data ou execute faltando").red
    }
}

//handler slash
client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand) return;
    const comando = interaction.client.commands.get(interaction.commandName)
    if(!comando) return;

    try  {
        await comando.execute(interaction)
    } catch {
        console.log("Houve um erro ao executar!")
    }
})


//Quando o bot ligar
client.once('ready', () => {
    console.log(`Bot conectado como: ${client.user.tag}`.green)
});



//logar
client.login("MTE5OTE1MzQzNjYzNDEzMjQ4MA.GrBO3B.VqDGlnRQ5HASKDa_4pAnK-4JuIW4uGubaxiXQM").catch(err => {
    console.log(`Houve um erro na parte da conexão a api \n`.yellow + `${err}`.red)
})

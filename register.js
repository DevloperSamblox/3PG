const { REST, Routes } = require("discord.js")


// importação dos comandos
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const commands = []

for (const file of commandFiles) { 
   const command = require(`./commands/${file}`)
   commands.push(command.data.toJSON())
}

// instância REST
const rest = new REST({version: "10"}).setToken("MTE5OTE1MzQzNjYzNDEzMjQ4MA.GqAa93.vvnErWLXymaG93aj714rCAOGXv7xEXYs8TO41U");

// deploy
(async () => {
    try {
        console.log(`Resentando ${commands.length} comandos...`)
    
        // PUT
        const data = await rest.put(
            Routes.applicationGuildCommands("1199153436634132480", "1199159615175274747"),
            {body: commands}
        )
            console.log("Comandos registrados com sucesso!")
    }
    catch (error){
        console.error(error)
    }
})()
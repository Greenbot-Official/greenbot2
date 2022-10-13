const startTime = Date.now();
console.log(`${new Date(startTime)}: <console> - Refreshing all application (/) commands...`);

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');
const fs = require('fs');

const voicecmds = [];
const voiceFiles = fs.readdirSync('./voice').filter(file => file.endsWith('.js'));

for (const file of voiceFiles) {
    const command = require(`./voice/${file}`);
    voicecmds.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(config.token);
  
(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(config.clientId),
      { body: voicecmds },
    );
    console.log(`${new Date(Date.now())}: <console> - Refreshed all application (/) commands in ${(Date.now() - startTime) / 1000} seconds.`)
  } catch (error) {
    console.error(error);
  }
})();
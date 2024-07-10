const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const cmdFiles = fs.readdirSync('C:/Users/caelb/Documents/Code/Discord Bots/greenbot2/commands').filter(file => file.endsWith('.js'));
const modFiles = fs.readdirSync('C:/Users/caelb/Documents/Code/Discord Bots/greenbot2/moderation').filter(file => file.endsWith('.js'));


module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows the help screen'),
  async execute(int, c) {
    const app = require('../app');
    const func = require('../resources/functions');
    const commands = [];
    const modCommands = [];

    for (const file of modFiles) {
      const command = require(`C:/Users/caelb/Documents/Code/Discord Bots/greenbot2/moderation/${file}`);
      modCommands.push(command.data.toJSON());
    }
    for (const file of cmdFiles) {
      const command = require(`C:/Users/caelb/Documents/Code/Discord Bots/greenbot2/commands/${file}`);
      commands.push(command.data.toJSON());
    }
    let description = "Economy:\n\n";
    for (const command of commands) {
      description = description + "/" + command.name + " - " + command.description + "\n";
    }
    description = description + "\nModeration:\n\n"
    for (const command of modCommands) {
      description = description + "/" + command.name + " - " + command.description + "\n";
    }

    const embededd = new MessageEmbed()
      .setTitle('Help')
      .setColor('#25c059')
      .setDescription(`${app.getCommands().map(cmd => `/${cmd.data.name} - ${cmd.data.name == 'help' ? 'Shows this screen' : cmd.data.description}.`).join('\n').replaceAll('undefined', 'No description set')}`)
      // .setImage('https://i.imgur.com/lB3Hqi7.png');

    func.log(`got help`, int, c);
    await int.reply({ embeds: [embededd] });
  },
}
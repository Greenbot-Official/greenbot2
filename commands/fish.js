const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fish')
    .setDescription('Go fishing'),
  cooldown: '10',
  async execute(int, c) {
    const app = require('../app')
    const func = require('../resources/functions')
    const embededd = new MessageEmbed()
      .setTitle(`Fish`)
      .setColor('#25c059')

    const user = app.currency.get(int.user.id);
    if (user.combat) {
      embededd.setDescription('You cannot fish while in combat!').setThumbnail('https://i.imgur.com/tDWLV66.png')
      return message.channel.reply({ embeds: [embededd] })
    }
    const fishexp = user.fish_exp || 0;
    const randmult = Math.sqrt(fishexp) * 2
    const randmult2 = Number(user.luck) / Math.round((Math.random() + 1) * 2)
    const rand = Math.round(Math.random() * randmult + 1 + randmult2)
    const money = rand / 2
    const biggest = user.biggest_catch || 0;
    const newrec = Math.max(rand, biggest)

    user.balance += Number(rand);
    user.fish_exp += Number(1);
    user.biggest_catch = Number(newrec)
    user.exp += Number(1)
    user.save();

    func.log(`caught a \$${rand} fish`, int, c)
    embededd.setDescription(`${int.user.username} caught a \$${rand} fish!`)
    return int.reply({ embeds: [embededd] })
  },
};
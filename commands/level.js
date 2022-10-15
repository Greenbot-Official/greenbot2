const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('level')
    .setDescription('Level up your character')
    .addStringOption(options =>
      options.setName('stat')
        .setDescription('Stat to level up')
        .setRequired(true)
        .addChoices({
          name: 'health',
          value: 'h'
        }, {
          name: 'luck',
          value: 'l'
        }, {
          name: 'strength', 
          value: 's'
        }, {
          name: 'dexterity',
          value: 'd'
        }))
    .addIntegerOption(options =>
      options.setName('amount')
        .setDescription('The number of times to level up')
        .setRequired(false)),
  async execute(int, c) {
    const app = require('../app')
    const func = require('../resources/functions')
    const embededd = new EmbedBuilder()
      .setTitle(`Level`)
      .setColor('#25c059')

    const stat = int.options.getString('stat')
    let amount = int.options.getInteger('amount') || 1;
    const user = app.currency.get(int.user.id);
    if (user.combat) {
      func.log(`attempted to level up a stat while in combat`, int, c)
      embededd.setDescription('You cannot level up a stat while in combat!').setThumbnail('https://i.imgur.com/tDWLV66.png')
      return int.reply({ embeds: [embededd] })
    }
    if (user.level_points <= 0) {
      func.log(`attempted to level up a stat when they had no level points`, int, c)
      embededd.setDescription('You do not have any level points!').setThumbnail('https://i.imgur.com/tDWLV66.png')
      return int.reply({ embeds: [embededd] })
    }
    if (amount === 'max' || amount === 'all') amount = user.level_points
    amount = Math.min(amount, user.level_points)
    user.level_points -= Number(amount)
    user.save()
    let statn
    switch (stat) {
      case 'h':
        statn = 'health'
        user.max_health += Number(amount)
        user.health = user.max_health
        break
      case 'l':
        statn = 'luck'
        user.luck += Number(amount)
        break
      case 's':
        statn = 'strength'
        user.strength += Number(amount)
        break
      case 'd':
        statn = 'dexterity'
        user.dexterity += Number(amount)
        break
      default:
        int.reply(`${args} is not a stat!`)
        break
    }
    user.save()

    func.log(`leveled up their ${statn}`, int, c)
    embededd.setDescription(`<@${int.user.id}> leveled up their ${statn} ${amount} ${amount > 1 ? `times!` : `time!`}`)
    return int.reply({ embeds: [embededd] })
  }
}
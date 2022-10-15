const func = require('../functions')
const app = require('../../app')
const { EmbedBuilder } = require('discord.js')

// Toby add func.logs for all the enchants

module.exports = {
  name: 'antidote',
  async execute(int, userEffects, user) {
    userEffects.poison = Number(0)
    userEffects.save()
    const embededd = new EmbedBuilder()
      .setTitle('Effects')
      .setColor('#25c059')
      .setDescription(`Debuff 'Poison' removed from <@${int.user.id}>!`)

    return int.channel.send({ embeds: [embededd] })
  }
}
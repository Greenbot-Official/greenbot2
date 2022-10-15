const func = require('../functions')
const app = require('../../app')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'water',
  async execute(int, userEffects, user) {
    userEffects.burn = Number(0)
    userEffects.save()
    const embededd = new EmbedBuilder()
      .setTitle('Effects')
      .setColor('#25c059')
      .setDescription(`Debuff 'Fire' removed from <@${int.user.id}>!`)

    return int.channel.send({ embeds: [embededd] })
  },
}
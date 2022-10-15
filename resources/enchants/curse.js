const func = require('../functions')
const app = require('../../app')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'curse',
  async execute(int, userEffects, user) {
    user.curse = true
    user.curse_time = Date.now()
    user.save()
    const embededd = new EmbedBuilder()
      .setTitle('Effects')
      .setColor('#25c059')
      .setDescription(`Debuff 'Curse' added to <@${int.user.id}>!`)

    return int.channel.send({ embeds: [embededd] })
  },
}
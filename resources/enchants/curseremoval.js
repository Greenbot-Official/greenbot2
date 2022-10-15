const func = require('../functions')
const app = require('../../app')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'curseremoval',
  async execute(int, userEffects, user) {
    user.curse = false
    user.save()
    const embededd = new EmbedBuilder()
      .setTitle('Effects')
      .setColor('#25c059')
      .setDescription(`Debuff 'Curse' removed from <@${int.user.id}>!`)

    return int.channel.send({ embeds: [embededd] })
  },
}
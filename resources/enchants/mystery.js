const func = require('../functions')
const app = require('../../app')
const { MessageEmbed } = require('discord.js')

// toby make all these take from the other ones

module.exports = {
  name: 'mystery',
  async execute(int, userEffects, tUserEffects, user, tUser) {
    const rand = Math.round(Math.random() * 4)
    switch (rand) {
      case 0:
        userEffects.burn = Number(2)
        userEffects.save()
        int.channel.send('you have been set on fire')
        break;
      case 1:
        userEffects.poison = Number(5)
        userEffects.save()
        int.channel.send('you have been poisoned')
        break;
      case 2:
        user.fish_exp += Math.round(user.fish_exp / 10)
        user.save()
        int.channel.send('you get better at fishing')
        break;
      case 3:
        user.luck += Number(2)
        user.save()
        int.channel.send('you get luckier')
        break;
      case 4:
        user.curse = true
        user.curse_time = Date.now()
        user.save()
        int.channel.send(`you have been cursed`);
        break
    }
  },
}
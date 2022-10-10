const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const { appendFile } = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a user')
    .addUserOption(option =>
      option.setName('user')
      .setDescription('The user you want to ban')
      .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
      .setDescription('The reason to ban that user')
      .setRequired(false)),
  async execute(int, client) {
    const app = require('../app')
    const embededd = new MessageEmbed()
      .setTitle('Ban')
      .setColor('#25c059');
  
    const func = require('../resources/functions');
    const user = int.options.getUser('user');
    const reason = int.options.getString('reason') || 'No reason provided';

    if (!int.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      embededd.setDescription('You do not have permission to use this command!').setThumbnail('https://i.imgur.com/tDWLV66.png');
      await int.reply({ embeds: [ embededd ]});
      return await func.modLog(int, `tried to use /ban when they didn't have permission!`, client);
    }
    
    if (int.member.roles.highest > int.guild.members.cache.get(user.id).roles.highest || user == client.user) {
      embededd.setDescription('You cannot ban this person!').setThumbnail('https://i.imgur.com/tDWLV66.png');
      await int.reply({ embeds: [ embededd ]});
      return await func.modLog(int, `tried to /ban someone higher than themselves!`, client);
    }

    if (int.guild.ownerId == user.id) {
      embededd.setDescription('You cannot ban a server\'s owner!').setThumbnail('https://i.imgur.com/tDWLV66.png')
      await int.reply({ embeds: [ embededd ] });
      return await func.modLog(int, `tried to ban ${int.guild.name}'s owner, <@${await int.guild.fetchOwner().id}>!`, client)
    }

    if (int.guild.ownerId == app.client.user.id) {
      embededd.setDescription('You cannot ban the bot!').setThumbnail('https://i.imgur.com/tDWLV66.png')
      await int.reply({ embeds: [ embededd ] });
      return await func.modLog(int, `tried to ban the bot!`, client)
    }

    embededd.setDescription(`Successfully banned <@${user.id}> for ${reason}!`);
    await int.reply({ embeds: [ embededd ] });
    await func.modLog(int, `banned <@${user.id}> for ${reason}!`, client);

    embededd.setDescription(`You have been banned from ${int.guild.name} for ${reason}!`);
    await user.createDM();
    await user.send({ embeds: [ embededd ] });
  
    return int.guild.members.ban(user.id, { reason: `${reason}` });
  },
};

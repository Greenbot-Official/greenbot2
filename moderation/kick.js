const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks a user')
    .addUserOption(option =>
      option.setName('user')
      .setDescription('The user you want to kick')
      .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
      .setDescription('The reason to kick that user')
      .setRequired(false)),
  async execute(int, client) {
    const app = require('../app')
    const embededd = new MessageEmbed()
      .setTitle('Kick')
      .setColor('#25c059');
  
    const func = require('../resources/functions');
    const user = int.options.getUser('user');
    const reason = int.options.getString('reason') || 'No reason provided';

    if (!int.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      embededd.setDescription('You do not have permission to use this command!').setThumbnail('https://i.imgur.com/tDWLV66.png');
      await int.reply({ embeds: [ embededd ]});
      return await func.modLog(int, `tried to use /kick when they didn't have permission!`, client);
    }
    
    if (int.member.roles.highest > int.guild.members.cache.get(user.id).roles.highest || user == client.user) {
      embededd.setDescription('You cannot kick this person!').setThumbnail('https://i.imgur.com/tDWLV66.png');
      await int.reply({ embeds: [ embededd ]});
      return await func.modLog(int, `tried to /ban someone higher than themselves!`, client);
    }

    if (int.guild.ownerId == user.id) {
      embededd.setDescription('You cannot kick a server\'s owner!').setThumbnail('https://i.imgur.com/tDWLV66.png')
      await int.reply({ embeds: [ embededd ] });
      return await func.modLog(int, `tried to kick ${int.guild.name}'s owner, <@${await int.guild.fetchOwner().id}>!`, client)
    }

    if (int.guild.ownerId == app.client.user.id) {
      embededd.setDescription('You cannot kick the bot!').setThumbnail('https://i.imgur.com/tDWLV66.png');
      await int.reply({ embeds: [ embededd] });
      return await func.modLog(int, `tried to kick the bot!`, client)
    }

    embededd.setDescription(`Successfully kicked <@${user.id}> for ${reason}!`);
    await int.reply({ embeds: [ embededd ] });
    await func.modLog(int, `kicked <@${user.id}> from this server for ${reason}!`, client);

    embededd.setDescription(`You have been kicked from ${int.guild.name} for ${reason}!`);
    await user.createDM();
    await user.send({ embeds: [ embededd ] });
  
    return int.guild.members.kick(user.id, `${reason}`);

  
  },
};

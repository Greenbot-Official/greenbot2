const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Joins VC')
    .addStringOption(option =>
      option.setName('song')
      .setDescription('the song query')
      .setRequired(true)),
  async execute(int, c) {
    const query = int.options.getString('song');
    if (!int.member.voice.channelId) return await int.reply({ content: "You are not in a voice channel!", ephemeral: true });
    if (int.guild.members.me.voice.channelId && int.member.voice.channelId !== int.guild.members.me.voice.channelId) return await int.reply({ content: "You are not in my voice channel!", ephemeral: true });

    const queue = c.player.createQueue(int.guild, {
      metadata: {
        channel: int.channel
      }
    });
    
    // verify vc connection
    try {
      if (!queue.connection) await queue.connect(int.member.voice.channel);
    } catch {
      queue.destroy();
      return await int.reply({ content: "Could not join your voice channel!", ephemeral: true });
    }

    await int.deferReply();
    const track = await player.search(query, {
      requestedBy: int.user
    }).then(x => x.tracks[0]);
  
    if (!track) return await int.followUp({ content: `❌ | Track **${query}** not found!` });

    queue.play(track);

    return await int.followUp({ content: `⏱️ | Loading track **${track.title}**!` });

    },
}

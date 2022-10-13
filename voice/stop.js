const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('stops current song'),
  async execute(int, c) {
    await int.deferReply();
    const queue = c.player.getQueue(int.guildId);
    if (!queue || !queue.playing) return void int.followUp({ content: "❌ | No music is being played!" });
    queue.destroy();
    return void int.followUp({ content: "🛑 | Stopped the player!" });
  },
}
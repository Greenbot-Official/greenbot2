const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('skips current track'),
  async execute(int, c) {
    await int.deferReply();
    const queue = c.player.getQueue(int.guildId);
    if (!queue || !queue.playing) return void int.followUp({ content: "❌ | No music is being played!" });
    const currentTrack = queue.current;
    const success = queue.skip();
    return void int.followUp({
        content: success ? `✅ | Skipped **${currentTrack}**!` : "❌ | Something went wrong!"
    });
  },
}
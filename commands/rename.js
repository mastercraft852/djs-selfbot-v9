exports.run = function(bot, msg, args) {
  var username = args.join("_");
  bot.user.setUsername(username);
  msg.channel.sendMessage(`Renamed myself to **${username}** because I can.`).catch(console.error);
  msg.delete().catch(console.error);
};
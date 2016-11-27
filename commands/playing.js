exports.run = function(bot, msg, args) {
  var game = args.join(" ");
  bot.user.setStatus(null, game);
  msg.delete().catch(console.error);
};
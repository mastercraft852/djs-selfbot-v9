exports.run = function(bot, msg, args) {
  bot.slashes.list(bot)
  .then(message => msg.edit(message));
};
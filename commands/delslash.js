exports.run = function(bot, msg, args) {
  let name = args[0];
  bot.slashes.delete(bot, name)
  .then(msg.edit(`The slash command ${name} has been deleted`).then(setTimeout(msg.delete.bind(msg), 1000)))
  .catch(e=> msg.edit(msg.author, e).then(setTimeout(msg.delete.bind(msg), 1000)));
};
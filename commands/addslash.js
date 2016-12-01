exports.run = function(bot, msg, args) {
  let name = args[0];
  let contents = args.slice(1).join(" ");
  bot.slashes.add(bot, name, contents)
  .then(msg.edit("Shortcut was added: "+name).then(setTimeout(msg.delete.bind(msg), 1000)))
  .catch(e=> msg.edit(msg.author, e).then(setTimeout(msg.delete.bind(msg), 1000)));
};
exports.run = function(bot, msg, args) {
  bot.db.run(`DELETE FROM shortcuts WHERE name = ?`, [args[0]]).then( () => {
    msg.edit(`The slash command ${args[0]} has been deleted`).then(setTimeout(msg.delete.bind(msg), 1000));
  });
};
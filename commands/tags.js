exports.run = function(bot, msg, args) {
  bot.db.all("SELECT * FROM tags").then(rows=> {
    msg.edit(`List of tags: ${rows.map(r => `${r.name} (${r.used})`).join(" ; ")}`);
  });
};
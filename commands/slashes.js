exports.run = function(bot, msg, args) {
  bot.db.all(`SELECT * FROM shortcuts`).then(rows=> {
    let message = [];
    message.push("```xl");
    var longest = rows.reduce(function (a, b) { return a.name.length > b.name.length ? a : b; });
    rows.map(row=>{
      let padded = (row.name + " ".repeat(longest.name.length+1-row.name.length));
      let count = (row.used + " ".repeat(3-row.used.toString().length));
      //console.log(`${padded}: `);
      message.push(`${bot.config.prefix}${padded} : ${count} : ${row.contents}`);
    });
    message.push("```");
    msg.edit(message.join("\n"));
  });
};
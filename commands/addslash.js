exports.run = function(bot, msg, args) {
  let name = args[0];
  let contents = args.slice(1).join(" ");
  bot.db.get(`SELECT * FROM shortcuts WHERE name = '${name}'`).then(row => {
    if(!row) {
      bot.db.run(`INSERT INTO "shortcuts" (name, contents) VALUES (?, ?)`, [name, contents]).then(()=>{
        msg.edit("Shortcut was added: "+name).then(setTimeout(msg.delete.bind(msg), 1000));
      });
    } else {
      msg.edit(msg.author, "Bitch that shortcut already exists. Srsly?").then(setTimeout(msg.delete.bind(msg), 1000));
    }
  });
};
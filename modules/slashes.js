const Discord = require("discord.js");
const slashes = new Discord.Collection();

exports.init = (bot) => {
  bot.db.all(`SELECT * FROM shortcuts`).then(rows=> {
    rows.map(row=>{
      slashes.set(row.name, {contents: row.contents, used: row.used});
    });
  });
};

exports.has = (name) => {
  return slashes.has(name);
};

exports.get = (name) => {
  if(this.has(name)) {
    let slash = slashes.get(name);
    return slash;
  } else {
    return false;
  }
}

exports.add = (bot, name, contents) => new Promise((resolve, reject) => {
  if(!this.has(name)) {
    bot.db.run(`INSERT INTO "shortcuts" (name, contents) VALUES (?, ?)`, [name, contents]).then(()=>{
      slashes.set(name, contents);
      resolve(name);
    });
  } else {
    reject("This Slash Shortcut already exists!");
  }
});

exports.delete = (bot, name) => new Promise((resolve, reject) => {
  if(this.has(name)) {
    bot.db.run(`DELETE FROM shortcuts WHERE name = ?`, [name]).then( () => {
      console.log("DELETED!!!!!!");
      slashes.delete(name);
      resolve();
    })
    .catch(reject);
  } else {
    reject("This Slash Shortcut does not exist!");
  }
});

exports.list = (bot) => new Promise((resolve, reject) => {
    let message = [];
    message.push("```xl");
    var longest = slashes.map((s,k,i)=>k).reduce(function (a, b) { return a.length > b.length ? a : b; });
    slashes.forEach((props, name)=>{
      console.log(name, props);
      let padded = (name + " ".repeat(longest.length+1-name.length));
      let count = (props.used + " ".repeat(3-props.used.toString().length));
      //console.log(`${padded}: `);
      message.push(`${bot.config.prefix}${padded} : ${count} : ${props.contents}`);
    });
    message.push("```");
    resolve(message);
});
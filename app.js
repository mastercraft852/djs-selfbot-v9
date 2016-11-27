'use strict';
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');

const log = (msg) => {
  // Very basic login function. Change the ID below to a channel for logging, or change to console.log!
  //bot.channels.get("204752675680681984").sendMessage(msg);
};

// Before using, rename `selfbot.sqlite.example` to `selfbot.sqlite`
const db = require('sqlite')
db.open('./selfbot.sqlite');

bot.config = config;
bot.db = db;

bot.on('ready', () => {
  log(`Selfbot Rewrite: Ready to spy on ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} servers.`);
  delete bot.user.email;
  delete bot.user.verified;
  console.log("=> Ready");
});

bot.on('message', msg => {
  if(msg.author.id !== bot.user.id) return;
  if(!msg.content.startsWith(config.prefix)) return;
  
  const args = msg.content.split(" ");
  const command = args.shift().slice(config.prefix.length);
  
  try {
    let cmdFile = require("./commands/" + command);
    cmdFile.run(bot, msg, args);
  } catch(e) {
    console.error(`Error while executing command\n${e}`);
  }
});

bot.on('message', msg => {
  if(msg.isMentioned(bot.user.id)) {
    console.log(`Just mentioned by ${msg.author.username} (${msg.author.id}) on ${msg.guild.name}/${msg.channel.name}:\n${msg.content}`);
  }

  if(msg.content.split(" ").length === 1) {
    db.get(`SELECT * FROM shortcuts WHERE name = ?`, [msg.content.slice(1)]).then(row => {
      if(!row) return;
      msg.edit(row.contents);
      db.run(`UPDATE shortcuts SET used = used+1 WHERE name = '${msg.content.slice(1)}'`);
    });
  }
});

bot.on('error', console.error);
bot.on('warn', console.warn);

bot.login(config.botToken);
bot.password = config.password;

process.on('uncaughtException', (err) => {
  let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
  console.error(errorMsg);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
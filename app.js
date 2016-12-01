'use strict';
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');

const log = (type, title, msg) => {
let channel = bot.channels.get("204752675680681984")
channel.sendMessage("", {embed: {
  color: 3447003,
  author: {
    name: bot.user.username,
    icon_url: bot.user.avatarURL
  },
  title: 'This is an embed',
  url: 'http://google.com',
  description: 'This is a test embed to showcase what they look like and what they can do.',
  fields: [
    {
      name: 'Fields',
      value: 'They can have different fields with small headlines.'
    },
    {
      name: 'Masked links',
      value: 'You can put [masked links](http://google.com) inside of rich embeds.'
    },
    {
      name: 'Markdown',
      value: 'You can put all the *usual* **__Markdown__** inside of them.'
    }
  ],
  timestamp: new Date(),
  footer: {
    icon_url: bot.user.avatarURL,
    text: '© Example'
  }
}});  
};

// Before using, rename `selfbot.sqlite.example` to `selfbot.sqlite`
const db = require('sqlite')
db.open('./selfbot.sqlite');

bot.config = config;
bot.db = db;

bot.slashes = require("./modules/slashes.js");

bot.on('ready', () => {
  log(`Selfbot Rewrite: Ready to spy on ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} servers.`);
  delete bot.user.email;
  delete bot.user.verified;
  bot.slashes.init(bot);
  console.log("=> Ready");
});

bot.on('message', msg => {
  if(msg.isMentioned(bot.user.id)) {
    console.log(`[MENTION] ${msg.author.username} (${msg.author.id}) on ${msg.guild.name}/${msg.channel.name}:\n${msg.content}`);
  }

  if(msg.author.id !== bot.user.id) return;
  if(!msg.content.startsWith(config.prefix)) return;
  
  const args = msg.content.split(" ");
  const command = args.shift().slice(config.prefix.length);
  
  let slash = bot.slashes.get(command);
  if(slash) {
    msg.edit(slash.contents);
    return;
  }
  try {
    let cmdFile = require("./commands/" + command);
    cmdFile.run(bot, msg, args);
  } catch(e) {
    msg.edit(msg.author + `Error while executing command\n${e}`).then(setTimeout(msg.delete.bind(msg), 1000));
  }
});

bot.on('error', console.error);
bot.on('warn', console.warn);
bot.on('disconnect', console.warn);

bot.on('messageDelete', msg => {
  if(["222078108977594368", "234357395646578688"].includes(msg.guild.id)) {
    console.log(`[MSGDelete] ${msg.author.username} (${msg.author.id}) on ${msg.guild.name}/${msg.channel.name}:\n${msg.content}`);
  }
});

bot.login(config.botToken);
bot.password = config.password;

process.on('uncaughtException', (err) => {
  let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
  console.error(errorMsg);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
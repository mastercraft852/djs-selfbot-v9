exports.run = function(bot, msg, args) {
  msg.edit(msg.author, "Rebooting!").then(m=>{
    setTimeout(() => {
      msg.delete().then(()=>process.exit(1));
    }, 500);
  });
};
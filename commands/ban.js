exports.run = function(bot, msg, args) {
  let ban_id = args[0];
  let days = args[1];
  msg.guild.ban(ban_id, days)
    .then( () => console.log(`Banned ${ban_id} and removed ${days} days of messages`))
    .catch(console.error);
};
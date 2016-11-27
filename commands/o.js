exports.run = function(bot, msg, args) {
  msg.channel.fetchMessages({limit: 2})
    .then(messages => {
      const contents = messages.last().content;
      msg.channel.sendMessage("ok google, " + contents)
        .then(m => m.delete());
      msg.delete();
    });
};
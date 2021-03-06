exports.run = (client, message, args, Discord) => {
  const Canvas = require('canvas');
  const hex = /^#?[0-9A-F]{6}$/i;
  if (message.mentions.members.first()) {
    message.channel.send(`${message.mentions.users.first().username}'s color is **${message.mentions.members.first().displayHexColor}**`);
  } else if (args.length > 1) {
    if (hex.test(args[1])) {
      message.channel.startTyping();
      let canvas = new Canvas(100, 100);
      let ctx = canvas.getContext('2d');

      if (args[1].includes('#'))
        ctx.fillStyle = args[1];
      else
        ctx.fillStyle = `#${args[1]}`;
      ctx.fillRect(0, 0, 1920, 1080);
      canvas.toBuffer((e, buff) => {
        let att = new Discord.Attachment()
          .setAttachment(buff, `${args[1]}.png`);
        message.channel.send(`Color for **${args[1]}:**`, { file: att }).then((msg) => {
          msg.channel.stopTyping();
        });
      });
    } else {
      message.channel.send(`Please input a proper hex color.`);
    }
  } else {
    message.channel.send(`Your color is **${message.member.displayHexColor}**`);
  }
};

exports.conf = {
  name: 'color',
  description: 'View a person\'s role color or an image of the color you provide.',
  usage: 'color [hexcode]/[@user]',
  aliases: ['colour'], // Some British asshole told me to add this.
};

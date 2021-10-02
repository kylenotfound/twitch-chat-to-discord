require("dotenv").config();
const {Client, Intents} = require('discord.js');
const tmi = require('tmi.js');

const discord_client_id = process.env.DISCORD_CLIENT_ID;
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//bot booted ok
client.once('ready', function() {
  console.log("Bot has booted!");
});

//twitch chat credentials
const opts = {
  identity: {
    username: 'spacelampsix',
    password: process.env.TWITCH_OAUTH
  },
  channels: [
    'spacelampsix'
  ]
};

/**
 * create new tmi client and connect to it
 */
const twitch = new tmi.client(opts);
twitch.on('message', onMessageHandler);
twitch.connect();

//on new message get message sender and message and pass to discord channel to be rendered
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } 

  const channel = client.channels.cache.find(channel => channel.id === process.env.DISCORD_CHANNEL_ID);
  
  if(context['display-name'] !== "Fossabot") {
    channel.send(context['display-name'] + ": " + msg);
  }
  
}

//login discord client
client.login(discord_client_id);



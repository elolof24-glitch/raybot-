
const { Client, GatewayIntentBits } = require('discord.js');

const TOKEN = process.env.DISCORD_TOKEN;
const RAYBOT_ID = '1428817627312164904';
const WATCH_CHANNEL_ID = '1483643930775130182';
const PING_ROLE = '<@&1500234218783899820>';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`✅ Bot online as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.id !== RAYBOT_ID) return;
  if (message.channel.id !== WATCH_CHANNEL_ID) return;

  try {
    await message.channel.send(PING_ROLE);
    console.log(`📣 Pinged role at ${new Date().toISOString()}`);
  } catch (err) {
    console.error('Failed to send ping:', err);
  }
});

client.login(TOKEN);

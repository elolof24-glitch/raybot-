const { Client, GatewayIntentBits } = require('discord.js');

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const TARGET_USER_ID = process.env.TARGET_USER_ID || '1428817627312164904';
const WATCH_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID || '1503070666457350328';
const PING_ROLE_ID = process.env.PING_ROLE_ID || '1503073585210593382';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`✅ Bot online as ${client.user.tag}`);
  console.log(`👀 Watching channel: ${WATCH_CHANNEL_ID}`);
  console.log(`🎯 Target user: ${TARGET_USER_ID}`);
  console.log(`📣 Ping role: ${PING_ROLE_ID}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.id !== TARGET_USER_ID) return;
  if (message.channel.id !== WATCH_CHANNEL_ID) return;

  try {
    await message.channel.send(`<@&${PING_ROLE_ID}>`);
    console.log(`📣 Pinged role at ${new Date().toISOString()}`);
  } catch (err) {
    console.error('Failed to send ping:', err);
  }
});

client.login(TOKEN);

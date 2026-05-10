const { Client, GatewayIntentBits } = require('discord.js');

const TOKEN = (process.env.DISCORD_BOT_TOKEN || '').trim();
const TARGET_USER_ID = process.env.TARGET_USER_ID || '1428817627312164904';
const WATCH_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID || '1503070666457350328';
const PING_ROLE_ID = process.env.PING_ROLE_ID || '1503073585210593382';

console.log('--- STARTUP CHECK ---');
console.log('DISCORD_BOT_TOKEN exists:', TOKEN.length > 0 ? 'yes' : 'no');
console.log('DISCORD_BOT_TOKEN length:', TOKEN.length);
console.log('DISCORD_BOT_TOKEN parts:', TOKEN ? TOKEN.split('.').length : 0);
console.log('DISCORD_BOT_TOKEN preview:', TOKEN ? `${TOKEN.slice(0, 6)}...${TOKEN.slice(-6)}` : 'EMPTY');
console.log('WATCH_CHANNEL_ID:', WATCH_CHANNEL_ID);
console.log('TARGET_USER_ID:', TARGET_USER_ID);
console.log('PING_ROLE_ID:', PING_ROLE_ID);

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
  if (message.author.id !== TARGET_USER_ID) return;
  if (message.channel.id !== WATCH_CHANNEL_ID) return;

  try {
    await message.channel.send(`<@&${PING_ROLE_ID}>`);
    console.log(`📣 Pinged role at ${new Date().toISOString()}`);
  } catch (err) {
    console.error('Failed to send ping:', err);
  }
});

client.login(TOKEN).catch((err) => {
  console.error('Discord login failed:', err);
  process.exit(1);
});

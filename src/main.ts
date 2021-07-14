import { Telegraf } from 'telegraf';

function loadEnv(value: string) {
  const result = process.env[value];
  if (typeof result === 'string') {
    return result;
  }
  throw new Error('Please provide token!');
}

const token: string = loadEnv('TOKEN');
const bot = new Telegraf(token);

bot.command('typobot', (ctx) => ctx.reply('new school'));
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

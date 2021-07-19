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

bot.on('text', (ctx) => console.log(ctx.message));

bot.command('typobot', (ctx) => {
  console.log(`got command from user ${ctx.message.from.first_name}`);
  console.log(typeof ctx.update);
  ctx.reply('new school');
});
bot.launch();

process.once('SIGINT', () => { bot.stop('SIGINT'); console.log('got sigint'); });
process.once('SIGTERM', () => { bot.stop('SIGTERM'); console.log('got sigterm'); });

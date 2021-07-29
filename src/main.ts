import { Scenes, session, Telegraf } from 'telegraf';
import antibotScene from './scenes/Antibot';
import { getOrThrow } from './utils/env';

const token: string = getOrThrow('TOKEN2', () => new Error('Please provide token!'));
const bot = new Telegraf<Scenes.SceneContext>(token);

const stage = new Scenes.Stage([antibotScene]);

bot.use(session());
bot.use(stage.middleware());
bot.command('antibot', (ctx) => ctx.scene.enter('antibot', { isBot: true }));

bot.launch();

process.once('SIGINT', () => { bot.stop('SIGINT'); console.log('got sigint'); });
process.once('SIGTERM', () => { bot.stop('SIGTERM'); console.log('got sigterm'); });

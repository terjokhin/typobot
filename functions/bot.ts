import { Scenes, session, Telegraf } from 'telegraf';
import { Handler } from '@netlify/functions';
import { getOrThrow } from '../src/utils/env';
import antibotScene from '../src/scenes/Antibot';

const token: string = getOrThrow('TOKEN2', () => new Error('Please provide token!'));
const bot = new Telegraf<Scenes.SceneContext>(token);

const stage = new Scenes.Stage([antibotScene]);

bot.use(session());
bot.use(stage.middleware());
bot.command('antibot', (ctx) => ctx.scene.enter('antibot', { isBot: true }));

bot.start((ctx) => {
  console.log('hey');
  ctx.reply('hey!');
});

const handler: Handler = async (event, _context) => {
  const { body } = event;
  if (typeof body === 'string') {
    try {
      await bot.handleUpdate(JSON.parse(body));
      return { statusCode: 200, body: '' };
    } catch (e) {
      console.log(e);
      return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
    }
  } else {
    return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handler };

import { Markup, Scenes } from 'telegraf';
import { User } from 'typegram';
import { antibotTimeoutMs, restrictObj, unrestrictObj } from '../config/config';
import asyncTimeout from '../utils/asynctimeout';
import * as kbUtils from '../utils/keyboard';

const antibotScene = new Scenes.BaseScene<Scenes.SceneContext>('antibot');

export { antibotScene as default };

function kickUser(ctx: Scenes.SceneContext, deleteMessageId: number, user: User) {
  console.log(`kickUser: Kicking user with name ${user.first_name}`);
  ctx.kickChatMember(user.id);
  ctx.deleteMessage(deleteMessageId);
}

async function kick(ctx: Scenes.SceneContext, keyboardMessageId: number, user: User) {
  const maybeSceneId = ctx.scene.current?.id;

  if (typeof maybeSceneId === 'string' && maybeSceneId === antibotScene.id) {
    console.log('kick: Here we should delete user and message in chat');
    kickUser(ctx, keyboardMessageId, user);
    ctx.scene.leave();
  } else {
    console.log('kick: we already left scene');
  }
}

antibotScene.leave((ctx) => ctx.reply('Finished antibot', Markup.removeKeyboard()));

antibotScene.action(kbUtils.yesCb, (ctx) => {
  console.log('ok: ok');
  ctx.answerCbQuery('Ok!');
  ctx.restrictChatMember(ctx.callbackQuery.from.id, unrestrictObj);
  ctx.deleteMessage(ctx.callbackQuery.message?.message_id ?? -1);
  ctx.scene.leave();
});

antibotScene.action([kbUtils.noCd, kbUtils.thirdFunnyOption], (ctx) => {
  ctx.answerCbQuery('oops!');
  kickUser(ctx, ctx.callbackQuery.message?.message_id ?? -1, ctx.callbackQuery.from);
  ctx.scene.leave();
});

antibotScene.enter(async (ctx) => {
  const user = ctx.message?.from;

  if (typeof (user) !== 'undefined') {
    ctx.restrictChatMember(user.id, restrictObj)
      // eslint-disable-next-line no-unused-vars
      .then((_b) => ctx.reply('To enter please, please click on Yes button.', kbUtils.default()))
      .then((message) => {
        asyncTimeout(antibotTimeoutMs, (() => kick(ctx, message.message_id, user)));
      });
  } else {
    ctx.scene.leave();
  }
});

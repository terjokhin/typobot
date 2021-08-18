import { Scenes } from 'telegraf';
import { User } from 'typegram';
import { antibotTimeoutMs, restrictObj, unrestrictObj } from '../config/config';
import asyncTimeout from '../utils/asynctimeout';
import * as kbUtils from '../utils/keyboard';

const antibotScene = new Scenes.BaseScene<Scenes.SceneContext>('antibot');

export { antibotScene as default };

function kickUser(ctx: Scenes.SceneContext, user: User, deleteMessageId?: number): Promise<true | void> {
  console.log(`kickUser: Kicking user with name ${user.first_name}`);
  return ctx.kickChatMember(user.id).then((_r) => ctx.deleteMessage(deleteMessageId));
}

async function kick(ctx: Scenes.SceneContext, user: User, keyboardMessageId: number | undefined) {
  const maybeSceneId = ctx.scene.current?.id;

  if (typeof maybeSceneId === 'string' && maybeSceneId === antibotScene.id) {
    console.log('kick: Here we should delete user and message in chat');
    kickUser(ctx, user, keyboardMessageId).then((_r) => ctx.scene.leave());
  } else {
    console.log('kick: we already left scene');
  }
}

antibotScene.leave((_ctx) => console.log('Leaving antobot scene.'));

antibotScene.action(kbUtils.yesCb, (ctx) => {
  console.log('ok: ok');
  ctx.answerCbQuery('Ok!')
    .then((_r) => ctx.restrictChatMember(ctx.callbackQuery.from.id, unrestrictObj))
    .then((_r) => ctx.deleteMessage(ctx.callbackQuery.message?.message_id))
    .then((_r) => ctx.scene.leave());
});

antibotScene.action([kbUtils.noCd, kbUtils.thirdFunnyOption], (ctx) => {
  ctx.answerCbQuery('oops!')
    .then((_r) => kickUser(ctx, ctx.callbackQuery.from, ctx.callbackQuery.message?.message_id))
    .then((_r) => ctx.scene.leave());
});

antibotScene.enter(async (ctx) => {
  const user = ctx.message?.from;

  if (typeof (user) !== 'undefined') {
    ctx.restrictChatMember(user.id, restrictObj)
      .then((_r) => ctx.reply('To enter please, please click on Yes button.', kbUtils.default()))
      .then((message) => asyncTimeout(antibotTimeoutMs, (() => kick(ctx, user, message.message_id))));
  } else {
    ctx.scene.leave();
  }
});

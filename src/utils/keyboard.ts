import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'typegram';

export const yesCb = 'yes';
export const noCd = 'no';
export const thirdFunnyOption = 'nonsense';

const yesButton = Markup.button.callback('Yes!', yesCb);
const noButton = Markup.button.callback('No!', noCd);
const thirdButton = Markup.button.callback('Not yet!', thirdFunnyOption);

type ReplyKbMk = Markup.Markup<InlineKeyboardMarkup>;

export default function antibotKeybord(): ReplyKbMk {
  // eslint-disable-next-line no-unused-vars
  const buttons = [yesButton, noButton, thirdButton].sort((_a, _b) => 0.5 - Math.random());
  const keyboard = Markup.inlineKeyboard(buttons);
  return keyboard;
}

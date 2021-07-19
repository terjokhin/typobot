import { Update, Message } from 'typegram';

interface UpdateWithText extends Update.MessageUpdate {
    message: Update.New & Update.NonChannel & Message.TextMessage
}

export default function isTextMessage(update: Update): update is UpdateWithText {
  return (update as UpdateWithText).message.text !== undefined;
}

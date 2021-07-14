import { Telegraf } from "telegraf"


const token: string = loadEnv("TOKEN")
const bot = new Telegraf(token)

bot.command('typobot', (ctx) => ctx.reply('new school'))
bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

function loadEnv(value: string): string {
    const result = process.env[value]
    if (typeof result === 'string') {
        return result;
    } else {
        return '';
    }
}
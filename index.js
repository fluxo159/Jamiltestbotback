const TelegramBot = require('node-telegram-bot-api')
const token = '7617660731:AAGKj-foVh8SEoJUY2YW49kGAkquJ1_aqO8'
const bot = new TelegramBot(token, { polling: true })
const webAppUrl = 'https://jamilbottestone.netlify.app/'
bot.on('message', async msg => {
	const chatId = msg.chat.id
	const text = msg.text

	if (text === '/start') {
		try {
			// Основное меню с кнопкой
			await bot.sendMessage(chatId, 'Добро пожаловать!', {
				reply_markup: {
					keyboard: [
						[
							{
								text: '📝 Заполните форму',
								web_app: { url: webAppUrl + '/form' },
							},
						],
						[{ text: 'ℹ️ Помощь' }],
					],
					resize_keyboard: true,
				},
			})

			// Инлайн кнопка для магазина
			await bot.sendMessage(chatId, 'Посетите наш тестовый магазин мебели:', {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: '🛍️ Сделать заказ',
								web_app: { url: webAppUrl },
							},
						],
					],
				},
			})
		} catch (error) {
			console.error('Ошибка отправки сообщения:', error)
			await bot.sendMessage(
				chatId,
				'Произошла ошибка. Пожалуйста, попробуйте позже.'
			)
		}
	}
})

bot.on('polling_error', error => {
	console.error('Polling error:', error)
})

console.log('Бот успешно запущен!')
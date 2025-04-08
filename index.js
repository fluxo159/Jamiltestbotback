const TelegramBot = require('node-telegram-bot-api')
const token = '7617660731:AAGKj-foVh8SEoJUY2YW49kGAkquJ1_aqO8'
const bot = new TelegramBot(token, { polling: true })
const webAppUrl = 'https://jamilbottestone.netlify.app'

// Обработчик всех входящих сообщений
bot.on('message', async msg => {
	const chatId = msg.chat.id
	const text = msg.text

	if (text === '/start') {
		try {
			// Основное меню с кнопкой
			await bot.sendMessage(
				chatId,
				'Добро пожаловать!, День 4, Это мой первый тестовый бот телеграм на базе mini apps с использование React / Node.js / Сделан тока мини каталог с описанием / если обнаружите баг напишите мне ',
				{
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
				}
			)


			// Инлайн кнопка для магазина
			await bot.sendMessage(chatId, 'Посетите наш тестовый магазин мебели:', {
				reply_markup: {
					inline_keyboard: [
						[{ text: '🛍️ Сделать заказ', web_app: { url: webAppUrl } }],
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

// Отдельный обработчик для данных из веб-приложения
bot.on('web_app_data', async msg => {
	const chatId = msg.chat.id

	if (msg.web_app_data?.data) {
		try {
			const data = JSON.parse(msg.web_app_data.data)
			console.log('Получены данные:', data)

			// Формируем красивое сообщение с данными
			let responseText =
				`📝 *Спасибо за регистрацию!*\n\n` +
				`👤 *Имя:* ${data.userName || 'не указано'}\n` +
				`👥 *Фамилия:* ${data.surName || 'не указана'}\n` +
				`📱 *Телефон:* ${data.phoneNumber || 'не указан'}`

			// Отправляем форматированное сообщение
			await bot.sendMessage(chatId, responseText, { parse_mode: 'Markdown' })

			// Дополнительное сообщение с благодарностью
			await bot.sendMessage(
				chatId,
				'Ваши данные успешно получены! Все за тобой выехали жди ).'
			)
		} catch (e) {
			console.error('Ошибка обработки данных формы:', e)
			await bot.sendMessage(
				chatId,
				'Произошла ошибка при обработке ваших данных. Пожалуйста, попробуйте еще раз.'
			)
		}
	}
})

bot.on('polling_error', error => {
	console.error('Polling error:', error)
})

console.log('Бот успешно запущен!')

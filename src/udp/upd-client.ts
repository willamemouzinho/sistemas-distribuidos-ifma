import dgram from 'node:dgram'

// Cria um socket UDP para o cliente
const client = dgram.createSocket('udp4')

// Define as informações do servidor (endereço IP e porta)
const SERVER_HOST = '127.0.0.1' // localhost
const SERVER_PORT = 7896 // Porta em que o servidor UDP está ouvindo

// Cria uma mensagem para enviar ao servidor
const message = 'Olá, servidor!'

// Converte a mensagem para um Buffer (formato binário)
const messageBuffer = Buffer.from(message)

// Envia a mensagem para o servidor
client.send(messageBuffer, SERVER_PORT, (err) => {
	if (err) {
		console.error('erro ao enviar mensagem:', err)
		client.close()
	} else {
		console.log('mensagem enviada para o servidor')
	}
})

// Evento de recebimento de resposta do servidor
client.on('message', (msg, rinfo) => {
	console.log(`resposta do servidor: ${msg.toString()}`)
	client.close()
})

// Evento de erro no cliente UDP
client.on('error', (err) => {
	console.error('erro no cliente UDP:', err)
})

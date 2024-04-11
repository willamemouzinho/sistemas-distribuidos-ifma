import net from 'node:net'

// Define as informações do servidor (endereço IP e porta)
const SERVER_HOST = '127.0.0.1' // localhost
const SERVER_PORT = 7896 // Porta em que o servidor TCP está ouvindo

// Cria um novo socket TCP
const socket = new net.Socket()

// Estabelece conexão com o servidor
socket.connect(SERVER_PORT, SERVER_HOST, () => {
	console.log('conexão estabelecida com o servidor')

	// Envia uma requisição para o servidor
	const requestData = 'Olá, servidor!'
	socket.write(requestData)

	// Evento de recebimento de dados do servidor
	socket.on('data', (data) => {
		console.log('resposta do servidor:', data.toString())

		// Fecha a conexão após receber a resposta
		socket.end()
	})

	// Evento de fechamento da conexão pelo servidor
	socket.on('end', () => {
		console.log('conexão encerrada pelo servidor')
	})
})

// Evento de erro na conexão
socket.on('error', (err) => {
	console.error('erro na conexão:', err.message)
})

// const client = net.connect({ port: 7896 }, () => {
// 	//use same port of server
// 	console.log('connected to server!')
// 	client.write('world!\r\n')
// })

// client.on('error', (err) => {
// 	console.log(err)
// 	client.end()
// })

// client.on('data', (data) => {
// 	console.log(data.toString())
// 	client.end()
// })
// client.on('end', () => {
// 	console.log('disconnected from server')
// })

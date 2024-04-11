import net, { type AddressInfo } from 'node:net'

// Cria um servidor TCP
const server = net.createServer((socket) => {
	console.log('cliente conectado')

	// Evento de recebimento de dados do cliente
	socket.on('data', (data) => {
		console.log('dados recebidos do cliente:', data.toString())

		// Ecoa os dados de volta para o cliente
		socket.write(`servidor recebeu: ${data.toString()}`)
	})

	// Evento de desconexão do cliente
	socket.on('end', () => {
		console.log('Cliente desconectado')
	})

	// Evento de erro do servidor
	socket.on('error', (err) => {
		console.error('Erro no socket:', err.message)
	})
})

// Evento de erro do socket
server.on('error', (err) => {
	console.error('Erro no servidor:', err.message)
})

// Define a porta em que o servidor irá ouvir
const PORT = 7896
server.listen({ port: PORT }, () => {
	const address = server.address() as AddressInfo
	console.log(`TCP server listening on port ${address.port}`)
})

import dgram from 'node:dgram'

// Cria um socket UDP
const server = dgram.createSocket('udp4')

// Evento de recebimento de mensagem
server.on('message', (msg, rinfo) => {
	console.log(`mensagem recebida do cliente: ${msg.toString()}`)

	// Envia a mensagem de volta para o cliente
	server.send(msg, rinfo.port, rinfo.address, (err) => {
		if (err) {
			console.error('erro ao enviar mensagem:', err)
		} else {
			console.log('mensagem enviada de volta para o cliente')
		}
	})
})

// Evento de erro no servidor UDP
server.on('error', (err) => {
	console.error('erro no servidor UDP:', err)
})

// Escuta em uma porta específica
const PORT = 6789
server.bind({ port: PORT }, () => {
	const address = server.address()
	console.log(`UDP server listening on port ${address.port}`)
})
